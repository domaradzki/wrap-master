"use server";

import { getAllDocuments } from "@/data/db-documnts";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const getDocuments = async (trader: string) => {
  const role = await currentRole();
  const documents = await getAllDocuments({
    trader,
    isAdmin: role === UserRole.ADMIN,
  });

  return documents;
  //   return { error: "Brak uprawnień" };
};
