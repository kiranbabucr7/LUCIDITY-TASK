import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { validateGeoLocation } from "./utils";
import {
  updateNoOfRestaurants,
  updateRestaurantsLocations,
  updateResturantsPreparationTime
} from "../../action";
import "./RestaurantsGeoLocationForm.css"

const RestaurantsGeoLocationForm = ({
  header,
  resturantsLocation,
  numberOflocations,
  preparationTime,
  updateNoOfRestaurants,
  updateRestaurantsLocations,
  updateResturantsPreparationTime,
}) => {
  const handleChange = ({ index, value, type }) => {
    let locationsArray = cloneDeep(resturantsLocation);
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

    updateRestaurantsLocations(locationsArray);
  };

  const onChangePrepTime = (value, index) => {
    let locationsArray = cloneDeep(resturantsLocation);
    locationsArray = locationsArray.map((item, indx) => {
      if (indx === index) {
        return {
          ...item,
          preparationTime:parseInt(value)
        }
      }
      return item
    });
    updateRestaurantsLocations(locationsArray)
  }

  useEffect(() => {
    if (numberOflocations) {
      const defaultLocationValues = {
        latitude: "",
        longitude: "",
        latitudeError: false,
        longitudeError: false,
        preparationTime: 0
      };
      const locations = Array.from(
        { length: numberOflocations },
        (item,index) => ({
          ...defaultLocationValues,
          name: `resturant ${index+1}`
        })
      );
      updateRestaurantsLocations(locations);
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
      {resturantsLocation?.map((location, index) => (
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
          <div>
            <label>
              Prep Time:
              <input
                type="number"
                value={preparationTime[index]}
                onChange={e => onChangePrepTime(e.target.value, index)}
              />
            </label>
          </div>
        </div>
      ))}
      {resturantsLocation?.map((loc, index) => (
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
  resturantsLocation: state?.restaurants?.locations,
  numberOflocations: state?.restaurants?.numberOflocations,
  preparationTime: state?.restaurants?.preparationTime
});

const mapDispatchToProps = {
  updateNoOfRestaurants,
  updateRestaurantsLocations,
  updateResturantsPreparationTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsGeoLocationForm);
