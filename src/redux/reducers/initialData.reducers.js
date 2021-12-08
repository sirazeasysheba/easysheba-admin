import { userConstants } from "../actions/constants";

const initData = {
  services: [],
  users: [],
  categories: [],
  products: [],
  orders: [],
  addresses: [],
};
const initialDataReducer = (state = initData, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case userConstants.GET_ALL_ORDERS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
    case userConstants.GET_ALL_ADDRESSES:
      state = {
        ...state,
        addresses: action.payload.addresses,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default initialDataReducer;
