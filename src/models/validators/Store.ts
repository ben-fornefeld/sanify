import { GeoPoint } from "firebase/firestore";
import { Geopoint } from "geofire-common";
import { z } from "zod";

const StoreValidator = z.object({
  name: z.string(),
  description: z.string().nullish(),
  booking_amount: z.number().nullish(),
  logo: z.string().url().nullish(),
  tags: z.array(z.string()).nullish(),
  time_created: z.string().nullish(),
  time_updated: z.string().nullish(),
  id: z.string(),
  stripe_id: z.string().nullish(),
  geo: z.object({
    geohash: z.string(),
    geopoint: z
      .custom<GeoPoint>((data) => data instanceof GeoPoint)
      .transform<Geopoint>((val: GeoPoint) => [val.latitude, val.longitude]),
  }),
  profile_image_uri: z.string().url(),
});

export type Store = z.infer<typeof StoreValidator>;
export default StoreValidator;
