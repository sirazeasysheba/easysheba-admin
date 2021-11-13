import { userConstants } from "../actions/constants";

const initialState = {
  loading: false,
  error: null,
  message: "",
  success: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTRATION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTRATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        // user: action.payload.user,
        // token: action.payload.token,
        // authenticate: true,
        // authenticating: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_REGISTRATION_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        success: false,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default userReducer;
