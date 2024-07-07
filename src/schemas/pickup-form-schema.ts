import { z } from "zod";

export const pickupFormSchema = z.object({
  floor: z.string().min(1, {
    message: "Floor is required",
  }),
  direction: z.enum(["up", "down"], {
    message: "Direction is required",
  }),
});
