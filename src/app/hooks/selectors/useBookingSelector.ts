import { BookingState } from "@/app/features/booking/bookingSlice";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const useBookingSelector = () =>
  useSelector<RootState, BookingState>((state) => state.booking);

export default useBookingSelector;
