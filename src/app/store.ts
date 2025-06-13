import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import mapSlice from "./features/map/mapSlice";
import accountSlice from "./features/account/accountSlice";
import bookingSlice from "./features/booking/bookingSlice";
import authMiddleware from "./middlewares/authMiddleware";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    map: mapSlice.reducer,
    account: accountSlice.reducer,
    booking: bookingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
