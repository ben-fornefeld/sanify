import { Booking } from "@/models/validators/Booking";
import { createSlice } from "@reduxjs/toolkit";
import { bookStore, fetchBookings } from "./bookingActions";
import { Unsubscribe } from "firebase/firestore";
import bookingApi from "@/api/bookingApi";
import store from "@/app/store";

export interface BookingState {
  bookings?: Booking[];
  bookingsLoading: boolean;
  bookingsModalOpen: boolean;
  unsubscribeBookings?: Unsubscribe;
}

const initialState: BookingState = {
  bookingsLoading: true,
  bookingsModalOpen: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    openBookingsModal: (state) => {
      state.bookingsModalOpen = true;
    },
    closeBookingsModal: (state) => {
      state.bookingsModalOpen = false;
    },
  },
  extraReducers(builder) {
    // bookStore

    builder.addCase(bookStore.fulfilled, (state, { payload }) => {
      state.bookings = state.bookings
        ? [...state.bookings, payload]
        : [payload];
    });

    // fetchBookings

    builder.addCase(fetchBookings.pending, (state) => {
      state.bookingsLoading = true;
    });

    builder.addCase(fetchBookings.fulfilled, (state, { payload }) => {
      state.bookingsLoading = false;
      state.bookings = payload;
    });

    builder.addCase(fetchBookings.rejected, (state) => {
      state.bookingsLoading = false;
    });
  },
});

export default bookingSlice;
