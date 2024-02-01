import React from "react";
import {
  updateDeliveryBoylatitude,
  updateDeliveryBoylongitude,
  updateDeliveryBoylatitudeError,
  updateDeliveryBoylongitudeError,
} from "../../action";
import { validateGeoLocation } from "./utils";
import { connect, useDispatch } from "react-redux";
import './SingleGeoLocationForm.css';

const DeliveryBoyLocationForm = ({
  header,
  latitude,
  longitude,
  latitudeError,
  longitudeError,
  updateDeliveryBoylatitude,
  updateDeliveryBoylongitude,
  updateDeliveryBoylatitudeError,
  updateDeliveryBoylongitudeError,
}) => {
  const dispatch = useDispatch();
  dispatch((newState) => ({
    type: "ADD_NEW_STATE",
    payload: 1,
  }));

  const handleSubmit = ({ value, type }) => {
    const isValidGeoLocation = validateGeoLocation(value);
    const geolocationSetter =
      type === "latitude"
        ? updateDeliveryBoylatitude
        : updateDeliveryBoylongitude;
    const geolocationErrorSetter =
      type === "latitude"
        ? updateDeliveryBoylatitudeError
        : updateDeliveryBoylongitudeError;
    geolocationSetter(value);
    geolocationErrorSetter(!isValidGeoLocation);
  };

  return (
    <div className="geo-location-form grey-border">
      <p>{header}</p>
      <div className="inputs-container">
        <div className="input-container">
          <label>Latitude:</label>
          <input
            className={latitudeError ? "error" : ""}
            type="number"
            step="any"
            value={latitude}
            onChange={(e) =>
              handleSubmit({ value: parseFloat(e.target.value), type: "latitude" })
            }
            onBlur={(e) =>
              handleSubmit({ value: parseFloat(e.target.value), type: "latitude" })
            }
          />
        </div>
        <div className="input-container">
          <label>Longitude:</label>
          <input
            className={longitudeError ? "error" : ""}
            type="number"
            step="any"
            value={longitude}
            onChange={(e) =>
              handleSubmit({ value: parseFloat(e.target.value), type: "longitude" })
            }
            onBlur={(e) =>
              handleSubmit({ value: parseFloat(e.target.value), type: "longitude" })
            }
          />
        </div>
      </div>
      {(latitudeError || longitudeError) && (
        <p className="error-msg">Please enter valid latitude and longitude.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  latitude: state.deliveryBoyLocation.latitude,
  longitude: state.deliveryBoyLocation.longitude,
  latitudeError: state.deliveryBoyLocation.latitudeError,
  longitudeError: state.deliveryBoyLocation.longitudeError,
});

const mapDispatchToProps = {
  updateDeliveryBoylatitude,
  updateDeliveryBoylongitude,
  updateDeliveryBoylatitudeError,
  updateDeliveryBoylongitudeError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryBoyLocationForm);
