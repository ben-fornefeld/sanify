const lerp = (a: number, b: number, alpha: number) => {
  return a + alpha * (b - a);
};

const distanceBetweenCoords = (
  p1: google.maps.LatLngLiteral,
  p2: google.maps.LatLngLiteral
) => {
  return Math.sqrt(Math.pow(p1.lng - p1.lat, 2) + Math.pow(p2.lng - p2.lat, 2));
};

const math = {
  lerp,
  distanceBetweenCoords,
};
export default math;
