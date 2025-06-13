import bookingApi from "@/api/bookingApi";
import store, { RootState } from "@/app/store";
import { Booking } from "@/models/validators/Booking";
import { Store } from "@/models/validators/Store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Unsubscribe } from "firebase/firestore";

export const bookStore = createAsyncThunk<Booking, Store, { state: RootState }>(
  "booking/bookStore",
  async (store, thunkApi) => {
    try {
      const user = thunkApi.getState().auth.user;

      if (!user) throw new Error("No user found");

      const booking = await bookingApi.bookStore(user, store);

      return thunkApi.fulfillWithValue(booking);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchBookings = createAsyncThunk<
  Booking[] | undefined,
  void,
  { state: RootState }
>("booking/fetchBookings", async (args, thunkApi) => {
  try {
    const user = thunkApi.getState().auth.user;

    if (!user) throw new Error("No user found");

    const bookings = await bookingApi.fetchBookings(user);

    return thunkApi.fulfillWithValue(bookings);
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const unsubscribeFromBookings = createAction(
  "booking/unsubscribeFromBookings"
);

export const openBookingsModal = createAction<void>(
  "booking/openBookingsModal"
);

export const closeBookingsModal = createAction<void>(
  "booking/closeBookingsModal"
);
