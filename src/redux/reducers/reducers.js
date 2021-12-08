import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import initialDataReducer from "./initialData.reducers";
import orderReducer from "./order.reducers";
import productReducer from "./product.reducers";
import serviceReducer from "./service.reducers";
import userReducer from "./user.reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  service: serviceReducer,
  product: productReducer,
  initialData: initialDataReducer,
  order: orderReducer,
});
export default rootReducer;
