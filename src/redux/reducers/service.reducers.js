import { serviceConstants } from "../actions/constants";

const initState = {
  services: [],
  loading: false,
  error: null,
};

const buildNewServices = (parentId, services, service) => {
  let myServices = [];
  if (parentId === undefined) {
    return [
      ...services,

      {
        _id: service._id,
        name: service.name,
        slug: service.slug,
        category: service.category,
        serviceImage: service.serviceImage,
        children: [],
      },
    ];
  }
  for (let serve of services) {
    if (serve._id === parentId) {
      const newService = {
        _id: service._id,
        name: service.name,
        slug: service.slug,
        category: service.category,
        serviceImage: service.serviceImage,
        parentId: service.parentId,
        children: [],
      };
      myServices.push({
        ...serve,
        children: serve.children
          ? [...serve.children, newService]
          : [newService],
      });
    } else {
      myServices.push({
        ...serve,
        children: serve.children
          ? buildNewServices(parentId, serve.children, service)
          : [],
      });
    }
  }
  return myServices;
};
const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case serviceConstants.GET_ALL_SERVICES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case serviceConstants.GET_ALL_SERVICES_SUCCESS:
      state = {
        ...state,
        services: action.payload.services,
        loading: false,
      };
      break;
    case serviceConstants.GET_ALL_SERVICES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case serviceConstants.ADD_NEW_SERVICES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case serviceConstants.ADD_NEW_SERVICES_SUCCESS:
      const updatedServices = buildNewServices(
        action.payload.service.parentId,
        state.services,
        action.payload.service
      );

      state = {
        ...state,
        services: updatedServices,
        loading: false,
      };
      break;
    case serviceConstants.ADD_NEW_SERVICES_FAILURE:
      state = {
        ...initState,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case serviceConstants.UPDATE_SERVICES_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case serviceConstants.UPDATE_SERVICES_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case serviceConstants.UPDATE_SERVICES_FAILURE:
      state = {
        ...state,
        // error: action.payload.error,
        error: action.payload.error,
      };
      break;
    case serviceConstants.DELETE_SERVICES_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case serviceConstants.DELETE_SERVICES_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case serviceConstants.DELETE_SERVICES_FAILURE:
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
export default serviceReducer;
