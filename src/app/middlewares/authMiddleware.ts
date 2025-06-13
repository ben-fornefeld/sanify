import { AppDispatch, RootState } from "@/app/store";
import {
  AnyAction,
  Dispatch,
  TypedStartListening,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
  bookStore,
  fetchBookings,
  unsubscribeFromBookings,
} from "../features/booking/bookingActions";

const authMiddleware = createListenerMiddleware();

export type AuthStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAuthListening =
  authMiddleware.startListening as AuthStartListening;

startAuthListening({
  predicate: (action, currentState, previousState) => {
    return previousState.auth.user?.uid !== currentState.auth.user?.uid;
  },
  effect: (action, listenerApi) => {
    if (!listenerApi.getState().auth.user) return;

    listenerApi.dispatch(fetchBookings());
  },
});

export default authMiddleware;
