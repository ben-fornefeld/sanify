import { Store } from "@/models/validators/Store";
import { Box } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { Coords } from "google-map-react";
import { CircleF, Marker, MarkerF } from "@react-google-maps/api";
import useMapSelector from "@/app/hooks/selectors/useMapSelector";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import { selectStore } from "@/app/features/map/mapActions";
import { MdStore } from "react-icons/md";

import markerStatic from "../../../../../public/markers/marker_static.svg";
import markerSelected from "../../../../../public/markers/marker_selected.svg";

interface StoreMarkerProps {
  store: Store;
}

const StoreMarker: FunctionComponent<StoreMarkerProps> = ({ store }) => {
  const { selectedStore } = useMapSelector();
  const marker = useRef<google.maps.Marker | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!store || !selectedStore || !marker.current) return;

    if (selectedStore === store) {
      marker.current.setIcon("/markers/marker_selected.svg");
      return;
    }

    if (marker.current.getIcon()?.toString().includes("marker_selected")) {
      marker.current.setIcon("/markers/marker_static.svg");
    }
  }, [selectedStore, store]);

  return (
    <MarkerF
      position={{
        lat: store.geo.geopoint[0],
        lng: store.geo.geopoint[1],
      }}
      onClick={() => dispatch(selectStore(store))}
      icon={"/markers/marker_static.svg"}
      onLoad={(mapMarker) => (marker.current = mapMarker)}
    ></MarkerF>
  );
};

export default StoreMarker;
