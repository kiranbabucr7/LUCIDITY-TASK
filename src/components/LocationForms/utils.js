import { min, max } from "lodash";
import { DELIVERY_BOY_SPEED } from "../../constants";

const validateGeoLocation = (loc) => {
  const location = parseFloat(loc);
  return !isNaN(location)  && location >= -90 && location <= 90;
};

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
}

function calculateTravelTime(distance, averageSpeedKmPerHour = DELIVERY_BOY_SPEED) {
  const travelTimeHours = distance / averageSpeedKmPerHour;
  return travelTimeHours;
}

const distanceBetweenTwoGeoLocations = (location1, location2) => {
  const earthRadiusKm = 6371;

  const lat1 = degreesToRadians(location1.latitude);
  const lon1 = degreesToRadians(location1.longitude);
  const lat2 = degreesToRadians(location2.latitude);
  const lon2 = degreesToRadians(location2.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}

const getTimeToTravelFromOneLocationToAnother= (location1, location2, currenttTotalTime) => {
  const distance = distanceBetweenTwoGeoLocations(location1,location2)
  const maxPrepTime = max([location1.preparationTime,location2.preparationTime])
  let time = calculateTravelTime(distance)
  if(currenttTotalTime < maxPrepTime){
    if(location2.preparationTime > time){
      time = location2.preparationTime
    }
  }
  return time
}

const getDeliveryDetails = (d, r1, r2, c1, c2) =>  {
  const paths = [
    [r1,r2,c1,c2],
    [r1,r2,c2,c1],
    [r1,c1,r2,c2],
    [r2,r1,c1,c2],
    [r2,r1,c2,c1],
    [r2,c2,r1,c1],
  ]
  const totalTimeTakenArray = paths.map((path) => {
    let time = 0
    path.forEach((loc,index) => {
      time = time + getTimeToTravelFromOneLocationToAnother(index === 0 ? d : path[index - 1],loc, time) 
    })
    return time
  })
  return paths[totalTimeTakenArray.indexOf(min(totalTimeTakenArray))]
}

export {
  validateGeoLocation,
  distanceBetweenTwoGeoLocations,
  getDeliveryDetails
}
