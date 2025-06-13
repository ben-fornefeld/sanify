import { z } from "zod";

export enum BookingStatus {
  pending = "pending",
  done = "done",
}

const BookingValidator = z.object({
  id: z.string(),
  amount: z.number().nullish(),
  status: z.nativeEnum(BookingStatus),
  store_id: z.string(),
  time_booked: z.string(),
  user_id: z.string(),
});

export type Booking = z.infer<typeof BookingValidator>;

export default BookingValidator;
