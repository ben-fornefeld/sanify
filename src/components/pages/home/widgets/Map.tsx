import useMapSelector from "@/app/hooks/selectors/useMapSelector";
import LoadingIndicator from "@/components/global/widgets/LoadingIndicator";
import { env } from "process";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useEffectOnce } from "usehooks-ts";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Skeleton } from "@chakra-ui/react";
import { NAVBAR_WIDTH, PADDING } from "@/config/constants";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import StoreMarker from "./StoreMarker";
import { mapStyle } from "@/config/map";
import store from "@/app/store";
import { AnimatePresence } from "framer-motion";
import StoreCard from "./StoreCard";
import math from "@/utils/math";
import { distanceBetween } from "geofire-common";
import mapUtils from "@/utils/map";

interface MapProps {}

const Map: FunctionComponent<MapProps> = () => {
  const { isLoaded: mapLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { center, zoom, loading, stores, selectedStore } = useMapSelector();

  const map = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!center || !map.current) return;

    map.current.panTo(center);
  }, [center]);

  // useEffect(() => {
  //   if (!stores) return;

  //   for (let store of stores) {
  //     const marker = new google.maps.Marker({
  //       position: mapUtils.geopointToLatLng(store.geo.geopoint),
  //       icon:
  //         selectedStore === store
  //           ? "/markers/marker_selected.svg"
  //           : "/markers/marker_static.svg",

  //     });

  //     marker.setMap(map.current);
  //   }
  // }, [stores, selectedStore]);

  if (!mapLoaded) {
    return null;
  }

  return (
    <Box
      w="full"
      h="full"
      bg="white"
      pos="relative"
      borderRadius="20px"
      overflow="hidden"
    >
      {loading || !mapLoaded ? (
        <Skeleton />
      ) : (
        <>
          <GoogleMap
            center={center}
            zoom={zoom}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
            options={{
              disableDefaultUI: true,
              styles: mapStyle,
            }}
            onLoad={(loadedMap) => {
              map.current = loadedMap;
            }}
          >
            {stores?.map((store, index) => (
              <StoreMarker key={`maps-store-marker-${index}`} store={store} />
            ))}
          </GoogleMap>
          <Box pos="absolute" top={PADDING} left={PADDING} bottom={PADDING}>
            <AnimatePresence mode="wait">
              {selectedStore && (
                <StoreCard
                  key={`map-store-card-${selectedStore.id}`}
                  store={selectedStore}
                />
              )}
            </AnimatePresence>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Map;
