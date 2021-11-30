import { userConstants } from "../actions/constants";

const initData = {
  services: [],
  users: [],
  categories: [],
  products: [],
};
const initialDataReducer = (state = initData, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;

    default:
      return state;
  }
  return state;
};
export default initialDataReducer;
