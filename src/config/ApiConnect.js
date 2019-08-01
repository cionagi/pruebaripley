import {normalize} from 'normalizr'
import * as Action from '../store/actions/ActionsTypes'
import axios from 'axios'
import * as _ from 'lodash'

export const API_ROOT = 'https://simple.ripley.cl/api/v2/'

axios.defaults.baseURL = API_ROOT
axios.defaults.timeout = 60000

type Callbacks = {
    onUploadProgress: () => {},
    onDownloadProgress: () => {},
    cancelToken: (cancel) => {}
}

type RequestConfig = {
    callbacks: Callbacks,
    data: FormData,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    responseSchema: Object
}

const callApi = (url: String, config: RequestConfig, token: String) => {
    let request = ''
    const {responseSchema = null, callbacks, method} = config
    
        request = {
            ...callbacks,
            url,
            method,
            headers: {
                'Content-Type':'application/json; charset=utf-8',
                "Accept": "*/*",
                "Cache-Control": "no-cache",
            }
        }
    return axios(request)
        .then(response => {
                const json = response.data
                if ([200, 201].indexOf(response.status) === -1) {
                    return Promise.reject(json)
                }

                if (responseSchema === null) {
                    return json
                }

                const nextPageUrl = getNextPageUrl(json)
                return Object.assign({}, normalize(json, responseSchema), {nextPageUrl})
            }
        )
        .catch(error => {
            const response = error.response.data
            return Promise.reject(response)
        })
}

const getNextPageUrl = json => {
    if (!json.hasOwnProperty('meta')) {
        return null
    }

    const {meta} = json

    if (!meta.hasOwnProperty('pagination')) {
        return null
    }

    if (meta.pagination.current_page >= meta.pagination.total_pages) {
        return null
    }

    return meta.pagination.links.next || undefined
}

export const CALL_API = 'Call API'

export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint} = callAPI
    const {schema, types, method = 'GET', data, callbacks} = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!data && !schema) {
        throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: Action.NETWORK_OPERATION_START}))
    next(actionWith({type: requestType}))

    const config = {responseSchema: schema, data, callbacks, method}
    return callApi(endpoint, config, ).then(
        
        response => {
            next(actionWith({
                response,
                type: successType
            }))
            next(actionWith({type: Action.NETWORK_OPERATION_END}))
        },
        error => {
            next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened'
            }))
            next(actionWith({type: Action.NETWORK_OPERATION_END}))
        }
    )
}