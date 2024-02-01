export const locationFormData = {
  latitude: "",
  longitude: "",
  latitudeError: false,
  longitudeError: false,
};
const initialState = {
  restaurants: {
    numberOflocations: 2,
    locations: [],
    preparationTime:[]
  },
  consumers: {
    numberOflocations: 2,
    locations: [],
  },
  deliveryBoyLocation: {
    name: 'DeliveryBoy',
    ...locationFormData,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NO_OF_RESTAURANTS":
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          numberOflocations: action.payload,
        },
      };
    case "UPDATE_RESTAURANTS_PREPARATION_TIME":
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          locations: action.payload,
        },
      };
    case "UPDATE_LATITUDE_DELIVERY_BOY":
      return {
        ...state,
        deliveryBoyLocation: {
          ...state.deliveryBoyLocation,
          latitude: action.payload,
        },
      };
    case "UPDATE_LONGITUDE_DELIVERY_BOY":
      return {
        ...state,
        deliveryBoyLocation: {
          ...state.deliveryBoyLocation,
          longitude: action.payload,
        },
      };
    case "UPDATE_LATITUDE_ERROR_DELIVERY_BOY":
      return {
        ...state,
        deliveryBoyLocation: {
          ...state.deliveryBoyLocation,
          latitudeError: action.payload,
        },
      };
    case "UPDATE_LONGITUDE_ERROR_DELIVERY_BOY":
      return {
        ...state,
        deliveryBoyLocation: {
          ...state.deliveryBoyLocation,
          longitudeError: action.payload,
        },
      };
    case "UPDATE_RESTAURANTS_LOCATION":
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          locations: action.payload,
        },
      };
    case "UPDATE_NO_OF_CONSUMERS":
      return {
        ...state,
        consumers: {
          ...state.consumers,
          numberOflocations: action.payload,
        },
      };
    case "UPDATE_CONSUMERS_LOCATION":
      return {
        ...state,
        consumers: {
          ...state.consumers,
          locations: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
