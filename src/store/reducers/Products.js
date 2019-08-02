import * as Action from "../actions/ActionsTypes";

const initialState = {
  isFetching: false,
  hasError: false,
  messageError: undefined,
  list: [],
  totalProducts: 0
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
      isFetching: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_ID_SUCCESS](state, action) {
    const {
      response,
      response: { uniqueID }
    } = action;

    let product = null
    if (state.list[uniqueID] === undefined) {
      product = {
        uniqueID: response.uniqueID,
        partNumber: response.partNumber,
        name: response.name,
        shortDescription: response.shortDescription,
        infoComplete:response
      }
    } else {
      product = response
    }

    return {
      ...state,
      list: {
        ...state.list,
        [uniqueID]: {
          ...state.list[uniqueID],
          ...product
        }
      },
      isFetching: false,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_ID_ERROR](state, action) {
    return {
      ...state,
      isFetching: false,
      hasError: true
    };
  }

  static [Action.GET_PRODUCTS_REQUEST](state, action) {
    return {
      isFetching: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCTS_SUCCESS](state, action) {
    const { response } = action;
    return {
      ...state,
      list: {
        ...state.list,
        ...response
      },
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
}

export default Products.reduce;
