import {
  GeoPoint,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Position } from "google-map-react";
import { Geopoint, distanceBetween, geohashQueryBounds } from "geofire-common";
import StoreValidator, { Store } from "@/models/validators/Store";

const fetchStoresInRadius = async (
  center: Geopoint,
  radiusInM: number
): Promise<Store[]> => {
  const bounds = geohashQueryBounds(center, radiusInM);
  const promises = [];

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  for (const b of bounds) {
    const q = query(
      collection(firestore, "stores"),
      orderBy("geo.geohash"),
      startAt(b[0]),
      endAt(b[1])
    );

    promises.push(getDocs(q));
  }

  // Collect all the query results together into a single list
  const snapshots = await Promise.all(promises);

  const matchingDocs = [];

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const point: GeoPoint = doc.data().geo.geopoint;

      const lat = point.latitude;
      const lng = point.longitude;

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc);
      }
    }
  }

  return matchingDocs.map((doc) => StoreValidator.parse(doc.data()));
};

const mapApi = {
  fetchStoresInRadius,
};

export default mapApi;
