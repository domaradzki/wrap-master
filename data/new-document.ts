import { db } from "@/lib/db";

export const getDocumentByDocumentId = async (documentId: number) => {
  try {
    const document = await db.document.findUnique({ where: { documentId } });
    return document;
  } catch {
    return null;
  }
};
