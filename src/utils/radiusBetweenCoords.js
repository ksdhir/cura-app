// export default function radiusBetweenCoords(coords1, coords2) {
//   const earthRadiusKm = 6371; // Earth's radius in kilometers

//   // Convert latitude and longitude from degrees to radians
//   const lat1 = deg2rad(coords1.latitude);
//   const lon1 = deg2rad(coords1.longitude);
//   const lat2 = deg2rad(coords2.latitude);
//   const lon2 = deg2rad(coords2.longitude);

//   // Haversine formula
//   const dLat = lat2 - lat1;
//   const dLon = lon2 - lon1;

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   // Calculate the distance
//   const distance = earthRadiusKm * c;

//   return distance; // The distance in kilometers
// }


export default function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}