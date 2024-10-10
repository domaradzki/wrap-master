"use server";

import { db } from "@/lib/db"; // Adjust the import path based on your project structure

// Action to add a document with items
export const deleteDocumentWithItems = async (id: string) => {
  const orders = await db.order.findMany({
    where: {
      documentId: id,
    },
  });

  try {
    // Validate the data using Zod schema
    if (!id) {
      return {
        error: `Validation failed. Errors: ${id}`,
      };
    }
    orders.map(async (order) => {
      await db.order.delete({
        where: {
          orderId: order.orderId,
        },
      });
    });

    //  const deleteOrder =
    const deleteDocument = await db.document.delete({
      where: {
        id,
      },
    });

    return {
      success: "Document with items added successfully.",
      data: { deleteDocument },
    };
  } catch (error) {
    console.error("Error adding document with items:", error);
    throw new Error("Failed to add document with items.");
  }
};
