import mapApi from "@/api/mapApi";
import { AppDispatch, RootState } from "@/app/store";
import { Store } from "@/models/validators/Store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Geopoint } from "geofire-common";

export const setLoading = createAction("map/setLoading", (loading: boolean) => {
  return {
    payload: loading,
  };
});

export const selectStore = createAction("map/selectStore", (store?: Store) => {
  return {
    payload: store,
  };
});

export const hoverStore = createAction("map/hoverStore", (store?: Store) => {
  return {
    payload: store,
  };
});

export const fetchStoresInRadius = createAsyncThunk<
  Store[],
  number,
  {
    state: RootState;
  }
>("map/fetchStoresInRadius", async (radiusInM, thunkApi) => {
  try {
    const mapState = thunkApi.getState().map;

    const center: Geopoint = [mapState.center!.lat, mapState.center!.lng];

    const stores = await mapApi.fetchStoresInRadius(center, radiusInM);

    return thunkApi.fulfillWithValue(stores);
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});
