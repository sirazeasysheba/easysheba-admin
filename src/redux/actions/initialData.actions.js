import axios from "../../helpers/axios";
import {
  categoryConstants,
  orderConstants,
  productConstants,
  serviceConstants,
  userConstants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialdata`);
    if (res.status === 200) {
      const { categories, products, services, users, orders, addresses } =
        res.data;
      console.log(orders);
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: serviceConstants.GET_ALL_SERVICES_SUCCESS,
        payload: { services },
      });
      dispatch({
        type: userConstants.GET_ALL_USERS,
        payload: { users },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: userConstants.GET_ALL_ADDRESSES,
        payload: { addresses },
      });
    }
  };
};
