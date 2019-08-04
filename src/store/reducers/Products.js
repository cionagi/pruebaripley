import * as Action from "../actions/ActionsTypes";
import _ from 'lodash';
const initialState = {
  isFetching: false,
  isFetchingProductId: false,
  hasError: false,
  messageError: undefined,
  list: [],
  totalProducts: 0,
  limit: 4,
  offset: 0,
  hasProducts: true,
  recentlyViewed:[],
  product: {}
};

class Products {
  static reduce(state = initialState, action) {
    if (Products[action.type]) {
      return Products[action.type](state, action);
    } else {
      return state;
    }
  }

  static [Action.GET_PRODUCT_BY_ID_REQUEST](state, action) {
    return {
      ...state,
      isFetchingProductId: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_ID_SUCCESS](state, action) {
    const {
      response,
      response: { uniqueID }
    } = action;

    let product = null

    return {
      ...state,
      product: response,
      isFetchingProductId: false,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_ID_ERROR](state, action) {
    return {
      ...state,
      isFetchingProductId: false,
      hasError: true
    };
  }

  static [Action.GET_PRODUCTS_REQUEST](state, action) {
    return {
      ...state,
      isFetching: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCTS_SUCCESS](state, action) {
    const { response } = action;
      return {
        ...state,
        hasProducts: !_.isEmpty(response),
        limit: action.payload.limit,
        offset: action.payload.offset,
        list: _.isEmpty(response) ? state.list : [...state.list, ...response],
        isFetching: false,
        hasError: false
      };
  }

  static [Action.GET_PRODUCTS_ERROR](state, action) {
    return {
      ...state,
      isFetching: false,
      hasError: true
    };
  }

  static [Action.SET_RECENTLY_VIEWED](state, action) {
    return {
        ...state,
        recentlyViewed: state.recentlyViewed.indexOf(action.payload) !== 0 ? [...state.recentlyViewed, action.payload] : [...state.recentlyViewed],
    }
  }

 

}

export default Products.reduce;
