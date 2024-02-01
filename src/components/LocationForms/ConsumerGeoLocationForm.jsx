import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { validateGeoLocation } from "./utils";
import {
  updateNoOfConsumers,
  updateConsumersLocations,
} from "../../action";
import "./RestaurantsGeoLocationForm.css"

const ConsumerGeoLocationForm = ({
  header,
  consumerLocation,
  numberOflocations,
  updateNoOfConsumers,
  updateConsumersLocations,
}) => {
  const handleChange = ({ index, value, type }) => {
    let locationsArray = cloneDeep(consumerLocation);
    const isValidGeoLocation = validateGeoLocation(value);
    const locationErrorKey =
      type === "latitude" ? "latitudeError" : "longitudeError";

    locationsArray = locationsArray.map((item, indx) => {
      const updatedData = cloneDeep(item);
      if (indx === index) {
        updatedData[type] = value;
        updatedData[locationErrorKey] = !isValidGeoLocation;
      }
      return updatedData;
    });

    updateConsumersLocations(locationsArray);
  };

  useEffect(() => {
    if (numberOflocations) {
      const defaultLocationValues = {
        latitude: "",
        longitude: "",
        latitudeError: false,
        longitudeError: false,
      };
      const locations = Array.from(
        { length: numberOflocations },
        (item,index) => ({
          ...defaultLocationValues,
          name: `customer ${index+1}`
        })
      );
      updateConsumersLocations(locations);
    }
  }, [numberOflocations]);

  return (
    <div className="multiple-geo-location-form grey-border">
      <p>{header}</p>
      <label>
        Number of Geo Locations:
        <span style={{marginLeft: "10px"}}>
          {numberOflocations}
        </span>
      </label>
      {consumerLocation?.map((location, index) => (
        <div key={index} className="location-inputs">
          <div>
            <label>Latitude {index + 1}:</label>
            <input
              className={location.latitudeError ? "error" : ""}
              type="number"
              step="any"
              value={location.latitude}
              onChange={(e) =>
                handleChange({
                  index,
                  value: parseFloat(e.target.value),
                  type: "latitude",
                })
              }
              onBlur={(e) =>
                handleChange({
                  index,
                  value: parseFloat(e.target.value),
                  type: "latitude",
                })
              }
            />
          </div>
          <div>
            <label>Longitude {index + 1}:</label>
            <input
              className={location.longitudeError ? "error" : ""}
              type="number"
              step="any"
              value={location.longitude}
              onChange={(e) =>
                handleChange({
                  index,
                  value: parseFloat(e.target.value),
                  type: "longitude",
                })
              }
              onBlur={(e) =>
                handleChange({
                  index,
                  value: parseFloat(e.target.value),
                  type: "longitude",
                })
              }
            />
          </div>
        </div>
      ))}
      {consumerLocation?.map((loc, index) => (
        loc.latitudeError || loc.longitudeError ? (
          <p key={index} className="error-msg">
            Please enter valid latitude and longitude location {index + 1}.
          </p>
        ) : null
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  consumerLocation: state?.consumers?.locations,
  numberOflocations: state?.consumers?.numberOflocations,
});

const mapDispatchToProps = {
  updateNoOfConsumers,
  updateConsumersLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumerGeoLocationForm);
