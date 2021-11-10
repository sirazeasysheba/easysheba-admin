import axios from "../../helpers/axios";
import { serviceConstants } from "./constants";

const getAllService = () => {
  return async (dispatch) => {
    dispatch({
      type: serviceConstants.GET_ALL_SERVICES_REQUEST,
    });
    const res = await axios.get(`/service/getservice`);
    console.log(res);

    if (res.status === 200) {
      const { serviceList } = res.data;
      dispatch({
        type: serviceConstants.GET_ALL_SERVICES_SUCCESS,
        payload: {
          services: serviceList,
        },
      });
    } else {
      dispatch({
        type: serviceConstants.GET_ALL_SERVICES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addService = (form) => {
  return async (dispatch) => {
    dispatch({
      type: serviceConstants.ADD_NEW_SERVICES_REQUEST,
    });
    try {
      const res = await axios.post(`/service/create`, form);
      console.log(res);
      if (res.status === 201) {
        dispatch({
          type: serviceConstants.ADD_NEW_SERVICES_SUCCESS,
          payload: { service: res.data.service },
        });
      } else {
        dispatch({
          type: serviceConstants.ADD_NEW_SERVICES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const updateCategoryAction = (form) => {
  return async (dispatch) => {
    dispatch({
      type: serviceConstants.UPDATE_SERVICES_REQUEST,
    });
    const res = await axios.post(`/service/update`, form);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: serviceConstants.UPDATE_SERVICES_SUCCESS,
      });
      dispatch(getAllService());
    } else {
      const { error } = res;
      dispatch({
        type: serviceConstants.UPDATE_SERVICES_FAILURE,
        payload: { error },
      });
    }
  };
};
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({
      type: serviceConstants.DELETE_SERVICES_REQUEST,
    });
    const res = await axios.post(`/service/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status === 201) {
      dispatch({
        type: serviceConstants.DELETE_SERVICES_SUCCESS,
      });
      dispatch(getAllService());
    } else {
      const { error } = res;
      dispatch({
        type: serviceConstants.DELETE_SERVICES_FAILURE,
        payload: { error },
      });
    }
  };
};

export { getAllService };
