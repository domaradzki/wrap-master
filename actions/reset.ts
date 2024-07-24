"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFileds = ResetSchema.safeParse(values);

  if (!validatedFileds.success) {
    return { error: "Błędny enail!" };
  }

  const { email } = validatedFileds.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email nie znaleziony!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Hasło zostało zresetowane! Sprawdź email" };
};
