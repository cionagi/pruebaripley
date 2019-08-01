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
    console.log(action);
    return {
      ...state,
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

  static [Action.GET_PRODUCT_BY_PART_NUMBER_REQUEST](state, action) {
    return {
      ...state,
      isFetching: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_PART_NUMBER_SUCCESS](state, action) {
    return {
      ...state,
      isFetching: false,
      hasError: false
    };
  }

  static [Action.GET_PRODUCT_BY_PART_NUMBER_ERROR](state, action) {
    return {
      ...state,
      isFetching: false,
      hasError: true
    };
  }

  static [Action.GET_PRODUCTS_BY_PART_NUMBERS_REQUEST](state, action) {
    return {
      isFetching: true,
      hasError: false
    };
  }

  static [Action.GET_PRODUCTS_BY_PART_NUMBERS_SUCCESS](state, action) {
    const { response } = action;
    const products = response.reduce((acc, product) => ({ ...acc, [product.uniqueID]: product }), {})
    return {
      ...state,
      list: {
        ...state.list,
        ...products
    },
      isFetching: false,
      hasError: false
    };
  }

  static [Action.GET_PRODUCTS_BY_PART_NUMBERS_ERROR](state, action) {
    return {
      ...state,
      isFetching: false,
      hasError: true
    };
  }
}

export default Products.reduce;
