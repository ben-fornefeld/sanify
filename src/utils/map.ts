import { Geopoint } from "geofire-common";
const geopointToLatLng = (point: Geopoint): google.maps.LatLngLiteral => {
  return {
    lat: point[0],
    lng: point[1],
  };
};

const mapUtils = {
  geopointToLatLng,
};

export default mapUtils;
