import React, { useState } from "react";
import "./App.css";
import RestaurantsGeoLocationForm from "./components/LocationForms/RestaurantsGeoLocationForm";
import SingleGeoLocationForm from "./components/LocationForms/SingleGeoLocationForm";
import { useSelector } from "react-redux";
import ConsumerGeoLocationForm from "./components/LocationForms/ConsumerGeoLocationForm";
import { getDeliveryDetails } from "./components/LocationForms/utils";

function App() {
  const [travelData, setTravelData] = useState({});
  const restaurants = useSelector((state) => state.restaurants);
  const consumers = useSelector((state) => state.consumers);
  const deliveryBoyLocation = useSelector((state) => state.deliveryBoyLocation);
  const isSubmitButtonDisabled = () => {
    if (
      deliveryBoyLocation.latitudeError ||
      deliveryBoyLocation.longitudeError ||
      !deliveryBoyLocation.latitude ||
      !deliveryBoyLocation.longitude ||
      restaurants?.locations?.some(
        (location) =>
          location.latitudeError ||
          location.longitudeError ||
          !location.latitude ||
          !location.longitude
      ) ||
      consumers?.locations?.some(
        (location) =>
          location.latitudeError ||
          location.longitudeError ||
          !location.latitude ||
          !location.longitude
      )
    ) {
      return true;
    }
    return false;
  };
  const onClickSubmitButton = () => {
    if (isSubmitButtonDisabled()) {
      alert("Please fill the form with correct values");
      return;
    }
    const travelDetails = getDeliveryDetails(
      deliveryBoyLocation,
      restaurants.locations[0],
      restaurants.locations[1],
      consumers.locations[0],
      consumers.locations[1]
    );
    setTravelData(travelDetails);
  };
  const travelLocations = [deliveryBoyLocation, ...travelData.path?travelData.path:[]]
  return (
    <div className="App">
      <SingleGeoLocationForm header={"Delivery Boy"} />
      <ConsumerGeoLocationForm header={"Consumers"} />
      <RestaurantsGeoLocationForm header={"Restaurants"} />
      <button className="submit-button" onClick={onClickSubmitButton}>
        submit
      </button>
      {travelData.path &&
        <div style={{marginLeft:'10px'}}>
          <p>The shortest path with minimun time {travelData.time} mins is:</p>
          <p>
            {travelData ? travelLocations.map((loc, index) => <span>{`${loc.name}${travelData?.path?.length !== index ? ' -> ' : ''}`}</span>) : null}
          </p>
        </div>
      }
    </div>   
  );
}

export default App;
