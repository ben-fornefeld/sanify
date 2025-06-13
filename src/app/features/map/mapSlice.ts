import { Store } from "@/models/validators/Store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchStoresInRadius } from "./mapActions";

export interface MapState {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  loading: boolean;
  stores?: Store[];
  selectedStore?: Store;
  hoveredStore?: Store;
}

const initialState: MapState = {
  center: { lat: 52.517363749751134, lng: 13.406498068686561 },
  zoom: 13,
  loading: true,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    selectStore: (state, { payload }) => {
      state.selectedStore = payload;

      if (payload) {
        state.center = {
          lat: payload.geo.geopoint[0],
          lng: payload.geo.geopoint[1],
        };
      }
    },
    hoverStore: (state, { payload }: PayloadAction<Store | undefined>) => {
      state.hoveredStore = payload;

      if (payload) {
        state.center = {
          lat: payload.geo.geopoint[0],
          lng: payload.geo.geopoint[1],
        };
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStoresInRadius.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStoresInRadius.fulfilled, (state, { payload }) => {
      state.stores = payload;
      state.loading = false;
    });
  },
});

export default mapSlice;
