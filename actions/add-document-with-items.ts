"use server";

import { getDocumentByDocumentId } from "@/data/db-document";
import { db } from "@/lib/db"; // Adjust the import path based on your project structure
import { CheckoutSchema } from "@/schemas/checkout";
import { Document } from "@/utils/structure"; // Assuming this is your Document type

// Action to add a document with items
export const addDocumentWithItems = async (data: Document) => {
  try {
    // Validate the data using Zod schema
    const validatedData = CheckoutSchema.parse(data);

    const dbDocument = await getDocumentByDocumentId(validatedData.documentId);

    if (dbDocument) {
      return {
        error: `Dokument o numerze ${validatedData.documentId} juz istnieje w bazie!`,
      };
    }
    // Create the document in the database
    const createdDocument = await db.document.create({
      data: {
        documentId: validatedData.documentId,
        dateInsert: validatedData.dateInsert,
        details: validatedData.details,
        documentStatus: validatedData.documentStatus,
        deliveryAddress: validatedData.deliveryAddress,
        symbol: validatedData.symbol,
        signature: validatedData.signature,
        trader: validatedData.trader,
        currency: validatedData.currency,
        exchangeRate: validatedData.exchangeRate || null,
        timestamp: validatedData.timestamp,
        closed: validatedData.closed,
        paymentMethod: validatedData.paymentMethod,
        transport: validatedData.transport,
        paymentDate: null, // Set as needed
        company: {
          connectOrCreate: {
            where: {
              companyId: validatedData.companyId,
            },
            create: {
              name: validatedData.name,
              companyId: validatedData.companyId,
            },
          },
        },
      },
      include: {
        company: true,
        orders: true,
      },
    });

    // Create associated orders in the database
    const orders = await Promise.all(
      validatedData.orders.map(async (order) => {
        return await db.order.create({
          data: {
            orderId: order.orderId,
            netValue: order.netValue,
            price: order.price,
            quantity: order.quantity,
            margin: order.margin || null,
            postfix: order.postfix || "", // Set as needed
            dateOfRealisation: order.dateOfRealisation,
            document: {
              connect: {
                documentId: createdDocument.documentId,
              },
            },
            product: {
              connectOrCreate: {
                where: {
                  productId: order.productId,
                },
                create: {
                  productId: order.productId,
                  assortment: order.assortment,
                  code: order.code,
                  kind: order.kind,
                  type: order.type,
                  unit: order.unit,
                  productCode: order.productCode,
                  ...((order.productCode === "TPD" ||
                    order.productCode === "TPD32") && {
                    tape: {
                      create: {
                        tapeLong: order.tapeLong || null,
                        tapeWidth: order.tapeWidth || null,
                        tapeThickness: order.tapeThickness || null,
                        numberOfColors: order.numberOfColors || null,
                        glue: order.glue || "",
                        tapeColor: order.tapeColor || "",
                        color1: order.color1 || "",
                        color2: order.color2 || "",
                        color3: order.color3 || "",
                        dateOfAcceptaion: order.dateOfAcceptaion ?? null,
                        printName: order.printName || "",
                      },
                    },
                  }),
                  ...((order.productCode === "FSM" ||
                    order.productCode === "FSMG" ||
                    order.productCode === "FSRG") && {
                    stretch: {
                      create: {
                        sleeve: order.sleeve || null,
                        stretchThickness: order.stretchThickness || null,
                        netWeight: order.netWeight || null,
                        grossWeight: order.grossWeight || null,
                        stretchColor: order.stretchColor || "",
                      },
                    },
                  }),
                },
              },
            },
          },
        });
      })
    );

    return {
      success: "Document with items added successfully.",
      data: { ...createdDocument, orders: orders },
    };
  } catch (error) {
    console.error("Error adding document with items:", error);
    throw new Error("Failed to add document with items.");
  }
};
