import {CALL_API} from '../../config/ApiConnect'
import * as Action from './ActionsTypes'
import {routes} from '../../config/EndPoints'

const getProductById = (productId) => ({
    [CALL_API]: {
        types: [Action.GET_PRODUCT_BY_ID_REQUEST, Action.GET_PRODUCT_BY_ID_SUCCESS, Action.GET_PRODUCT_BY_ID_ERROR],
        endpoint: routes.GET_PRODUCT_BY_ID,
        method: 'post',
        data: {
            id: productId
        }
    }
})

const getProducts = (productsIds) => ({
    [CALL_API]: {
        types: [Action.GET_PRODUCTS_REQUEST, Action.GET_PRODUCTS_SUCCESS, Action.GET_PRODUCTS_ERROR],
        endpoint: routes.GET_PRODUCTS,
        method: 'post',
        data: {
            ids: productsIds
        }
    }
})

export const callGetProductById = (productId) => (dispatch) => {
    return dispatch(getProductById(productId))
}

export const callGetProducts = (productsIds) => (dispatch) => {
     console.log(productsIds)
    return dispatch(getProducts(productsIds))
}
