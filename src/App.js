import React, { useState } from "react";
import "./App.css";
import RestaurantsGeoLocationForm from "./components/LocationForms/RestaurantsGeoLocationForm";
import SingleGeoLocationForm from "./components/LocationForms/SingleGeoLocationForm";
import { useSelector } from "react-redux";
import ConsumerGeoLocationForm from "./components/LocationForms/ConsumerGeoLocationForm";
import { getDeliveryDetails } from "./components/LocationForms/utils";

function App() {
  const [travelData, setTravelData] = useState(null);
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
  return (
    <div className="App">
      <SingleGeoLocationForm header={"Delivery Boy"} />
      <div style={{ display: "flex", gap: "30px" }}>
        <RestaurantsGeoLocationForm header={"Restaurants"} />
        <ConsumerGeoLocationForm header={"Consumers"} />
      </div>
      <button className="submit-button" onClick={onClickSubmitButton}>
        submit
      </button>
      {travelData ? [deliveryBoyLocation, ...travelData].map(loc => <p>{loc.name}</p>) : null}
    </div>   
  );
}

export default App;
