import { z } from "zod";
import { db } from "@/lib/db";
import { documentSchema } from "@/schemas/checkout";

const addDocumentWithItems = async (data: z.infer<typeof documentSchema>) => {
  try {
    const { file, ...rest } = data;

    // Create a document
    const document = await db.document.create({
      data: {
        // Map data to document fields
      },
    });

    // Create items associated with the document
    const items = await db.order.createMany({
      data: [
        {
          documentId: document.id,
          orderId: orderId,
        },
      ],
    });

    // Handle file upload if needed
    if (file) {
      // Upload file to storage and associate it with the document or items
    }

    return { document, items };
  } catch (error) {
    console.error("Error adding document with items:", error);
    throw error;
  }
};
