import { z } from "zod";

export const updateFormSchema = z.object({
  id: z.string().min(1, {
    message: "ID is required",
  }),
  currentFloor: z.string().min(1, {
    message: "Current floor is required",
  }),
  targetFloor: z.string().min(1, {
    message: "Target floor is required",
  }),
});