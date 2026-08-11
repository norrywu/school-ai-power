import { z } from "zod";

export const ROLE_VALUES = ["admin", "teacher"] as const;

export const userSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  role: z.enum(ROLE_VALUES),
});

export const updateUserSchema = userSchema.extend({
  password: z.string().min(8, "Kata sandi minimal 8 karakter").or(z.literal("")),
});

export type UserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
