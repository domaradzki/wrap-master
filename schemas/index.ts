import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "Nowe hasło jest wymagane!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Hasło jest wymagane!", path: ["password"] }
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email jest wymagany!" }),
  password: z.string().min(1, { message: "Hasło jest wymagane!" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Hasło jest wymagane!" }),
  password: z.string().min(6, { message: "Minimum 6 znaków jest wymagane!" }),
  name: z.string().min(2, { message: "Minimum 2 znaków jest wymagane!" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Wprowadź email!" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 znaków jest wymagane!" }),
});
