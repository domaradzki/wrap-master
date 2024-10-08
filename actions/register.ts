"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFileds = RegisterSchema.safeParse(values);
  if (!validatedFileds.success) {
    return { error: "Email lub hasło niepoprawne!" };
  }
  const { email, password, name } = validatedFileds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Podany adres email już zajęty!" };
  }

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Weryfikujący email został wysłany!" };
};
