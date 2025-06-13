import BookingValidator, {
  Booking,
  BookingStatus,
} from "@/models/validators/Booking";
import {
  DocumentData,
  QuerySnapshot,
  Unsubscribe,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Store } from "@/models/validators/Store";
import { User } from "@/models/validators/User";
import { DEFAULT_TIMEOUT } from "@/config/constants";

const bookStore = async (user: User, store: Store): Promise<Booking> => {
  const docRef = doc(collection(firestore, "bookings"));

  const booking = BookingValidator.parse({
    id: docRef.id,
    store_id: store.id,
    user_id: user.uid,
    amount: store.booking_amount,
    time_booked: new Date().toISOString(),
    status: BookingStatus.pending,
  });

  await DEFAULT_TIMEOUT();

  await setDoc(docRef, booking);

  return booking;
};

const fetchBookings = async (user: User): Promise<Booking[] | undefined> => {
  const snap = await getDocs(
    query(collection(firestore, "bookings"), where("user_id", "==", user.uid))
  );

  if (snap.empty) return;

  return snap.docs.map((doc) => BookingValidator.parse(doc.data()));
};

const subscribeToBookings = (
  user: User,
  callback: (bookings: Booking[]) => void
): Unsubscribe => {
  return onSnapshot(
    query(collection(firestore, "bookings"), where("user_id", "==", user.uid)),
    (snap) => {
      const bookings = snap.docs.map((doc) =>
        BookingValidator.parse(doc.data())
      );

      callback(bookings);
    }
  );
};

const bookingApi = {
  bookStore,
  fetchBookings,
  subscribeToBookings,
};

export default bookingApi;
