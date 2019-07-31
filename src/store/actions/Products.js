import {CALL_API} from '../../config/ApiConnect'
import * as Action from './ActionsTypes'
import {routes} from '../../config/EndPoints'

const getProductById = (productId) => ({
    [CALL_API]: {
        types: [Action.GET_PRODUCT_BY_ID_REQUEST, Action.GET_PRODUCT_BY_ID_SUCCESS, Action.GET_PRODUCT_BY_ID_ERROR],
        endpoint: routes.GET_PRODUCT_BY_ID.replace(':productId', productId),
        method: 'get',
        data: {}
    }
})
const getProductByPartNumber = (partNumber) => ({
    [CALL_API]: {
        types: [Action.GET_PRODUCT_BY_PART_NUMBER_REQUEST, Action.GET_PRODUCT_BY_PART_NUMBER_SUCCESS, Action.GET_PRODUCT_BY_PART_NUMBER_ERROR],
        endpoint: routes.GET_PRODUCT_BY_PART_NUMBER.replace(':partNumber', partNumber),
        method: 'get',
        data: {}
    }
})
const getProductsByPartNumbers = (partNumbers) => ({
    [CALL_API]: {
        types: [Action.GET_PRODUCTS_BY_PART_NUMBERS_REQUEST, Action.GET_PRODUCTS_BY_PART_NUMBERS_SUCCESS, Action.GET_PRODUCTS_BY_PART_NUMBERS_ERROR],
        endpoint: routes.GET_PRODUCTS_BY_PART_NUMBERS.replace(':partNumbers', partNumbers),
        method: 'get',
        data: {}
    }
})

export const callGetProductById = (productId) => (dispatch) => {
    return dispatch(getProductById(productId))
}
export const callGetProductByPartNumber = (partNumber) => (dispatch) => {
    return dispatch(getProductByPartNumber(partNumber))
}
export const callGetProductsByPartNumbers = (partNumbers) => (dispatch) => {
    return dispatch(getProductsByPartNumbers(partNumbers))
}
