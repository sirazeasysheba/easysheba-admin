import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
};
const productReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCTS_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCTS_FAILURE:
      state = {
        ...state,
        // error: action.payload.error,
        error: action.payload.error,
      };
      break;
    case productConstants.DELETE_PRODUCTS_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCTS_FAILURE:
      state = {
        ...state,
        // error: action.payload.error,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default productReducer;
