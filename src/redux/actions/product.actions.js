import axios from "../../helpers/axios";
import { productConstants } from "./constants";

const getAllProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.GET_ALL_PRODUCTS_REQUEST,
    });
    const res = await axios.get(`/product/getproduct`);
    console.log(res);
    if (res.status === 200) {
      const { productList } = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products: productList,
        },
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    const res = await axios.post("/product/create", { ...product });
    console.log(res);
  };
};

export const updateProductAction = (form) => {
  // console.log(form);
  return async (dispatch) => {
    dispatch({
      type: productConstants.UPDATE_PRODUCTS_REQUEST,
    });
    const res = await axios.post(`/product/update`, form);
    if (res.status === 201) {
      dispatch({
        type: productConstants.UPDATE_PRODUCTS_SUCCESS,
      });
      // dispatch(getAllService());
    } else {
      const { error } = res;
      dispatch({
        type: productConstants.UPDATE_PRODUCTS_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.DELETE_PRODUCTS_REQUEST,
    });
    const res = await axios.post(`/product/delete`, {
      payload: {
        id,
      },
    });
    if (res.status === 201) {
      dispatch({
        type: productConstants.DELETE_PRODUCTS_SUCCESS,
      });
    } else {
      const { error } = res;
      dispatch({
        type: productConstants.DELETE_PRODUCTS_FAILURE,
        payload: { error },
      });
    }
  };
};
export { getAllProduct };
