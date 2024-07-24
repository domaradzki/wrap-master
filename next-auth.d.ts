import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { boolean } from "zod";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
