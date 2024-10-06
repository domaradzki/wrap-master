"use server";

import { getAllDocuments } from "@/data/db-documents";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
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

export const getDocumentByIdWithItems = async (id: string) => {
  try {
    const document = await db.document.findUnique({
      where: { id },
      include: {
        company: true,
        orders: {
          include: {
            product: {
              include: {
                tape: true,
                stretch: true,
              },
            },
          },
        },
      },
    });
    return document;
  } catch {
    return null;
  }
};
