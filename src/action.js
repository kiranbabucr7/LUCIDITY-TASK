// actions.js
export const updateDeliveryBoylatitude = (value) => ({
  type: "UPDATE_LATITUDE_DELIVERY_BOY",
  payload: value,
});
export const updateDeliveryBoylongitude = (value) => ({
  type: "UPDATE_LONGITUDE_DELIVERY_BOY",
  payload: value,
});
export const updateDeliveryBoylatitudeError = (value) => ({
  type: "UPDATE_LATITUDE_ERROR_DELIVERY_BOY",
  payload: value,
});
export const updateDeliveryBoylongitudeError = (value) => ({
  type: "UPDATE_LONGITUDE_ERROR_DELIVERY_BOY",
  payload: value,
});
export const updateNoOfRestaurants = (value) => ({
  type: "UPDATE_NO_OF_RESTAURANTS",
  payload: value,
});
export const updateRestaurantsLocations = (value) => ({
  type: "UPDATE_RESTAURANTS_LOCATION",
  payload: value,
});
export const updateResturantsPreparationTime = (value) => ({
  type: "UPDATE_RESTAURANTS_PREPARATION_TIME",
  payload: value,
});
export const updateNoOfConsumers = (value) => ({
  type: "UPDATE_NO_OF_CONSUMERS",
  payload: value,
});
export const updateConsumersLocations = (value) => ({
  type: "UPDATE_CONSUMERS_LOCATION",
  payload: value,
});
