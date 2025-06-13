import z from "zod";

const UserValidator = z.object({
  uid: z.string(),
  email: z.string().email(),
  name: z.string().nullish(),
  profile_image_url: z.string().nullish(),
  time_created: z.string(),
  time_updated: z.string(),
});

export type User = z.infer<typeof UserValidator>;
export default UserValidator;
