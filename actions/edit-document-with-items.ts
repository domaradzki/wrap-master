"use server";

import { z } from "zod";
import { db } from "@/lib/db"; // Adjust the import path based on your project structure
import { DocumentSchema } from "@/schemas/document";
import { getDocumentById } from "@/data/db-document";

// Action to update a document with items
export const editDocumentWithItems = async (
  data: z.infer<typeof DocumentSchema>
) => {
  try {
    const dbDocument = await getDocumentById(data.id);

    if (!dbDocument) {
      return {
        error: `Dokument o numerze ${data.id} nie istniej`,
      };
    }
    const updatedDocument = await db.document.update({
      where: {
        id: data.id,
      },
      data: {
        dateInsert: data.dateInsert,
        details: data.details,
        documentStatus: data.documentStatus,
        deliveryAddress: data.deliveryAddress,
        symbol: data.symbol,
        signature: data.signature,
        trader: data.trader,
        currency: data.currency,
        exchangeRate: data.exchangeRate || null,
        timestamp: data.timestamp,
        closed: data.closed,
        paymentMethod: data.paymentMethod,
        transport: data.transport,
        paymentDate: null, // Set as needed
        company: {
          connectOrCreate: {
            where: {
              id: data.companyId,
            },
            create: {
              name: data.company.name,
              companyId: data.company.companyId,
            },
          },
        },
      },
      include: {
        company: true,
        orders: true,
      },
    });

    // Update associated orders in the database
    const orders = await Promise.all(
      data.orders.map(async (order) => {
        return await db.order.upsert({
          where: {
            orderId: order.orderId,
          },
          update: {
            netValue: order.netValue,
            price: order.price,
            quantity: order.quantity,
            margin: order.margin,
            postfix: order.postfix || "", // Set as needed
            dateOfRealisation: order.dateOfRealisation,
            document: {
              connect: {
                documentId: updatedDocument.documentId,
              },
            },
            product: {
              connectOrCreate: {
                where: {
                  id: order.productId,
                },
                create: {
                  productId: order.product.productId,
                  assortment: order.product.assortment,
                  code: order.product.code,
                  kind: order.product.kind,
                  type: order.product.type,
                  unit: order.product.unit,
                  productCode: order.product.productCode,
                  ...((order.product.productCode === "TPD" ||
                    order.product.productCode === "TPD32") && {
                    tape: {
                      create: {
                        tapeLong: order.product.tape?.tapeLong || null,
                        tapeWidth: order.product.tape?.tapeWidth || null,
                        tapeThickness:
                          order.product.tape?.tapeThickness || null,
                        numberOfColors:
                          order.product.tape?.numberOfColors || null,
                        glue: order.product.tape?.glue || "",
                        tapeColor: order.product.tape?.tapeColor || "",
                        color1: order.product.tape?.color1 || "",
                        color2: order.product.tape?.color2 || "",
                        color3: order.product.tape?.color3 || "",
                        dateOfAcceptation:
                          order.product.tape?.dateOfAcceptation ?? null,
                        printName: order.product.tape?.printName || "",
                      },
                    },
                  }),
                  ...((order.product.productCode === "FSM" ||
                    order.product.productCode === "FSMG" ||
                    order.product.productCode === "FSRG") && {
                    stretch: {
                      create: {
                        sleeve: order.product.stretch?.sleeve || null,
                        stretchThickness:
                          order.product.stretch?.stretchThickness || null,
                        netWeight: order.product.stretch?.netWeight || null,
                        grossWeight: order.product.stretch?.grossWeight || null,
                        stretchColor: order.product.stretch?.stretchColor || "",
                      },
                    },
                  }),
                },
              },
            },
          },
          create: {
            orderId: order.orderId,
            netValue: order.netValue,
            price: order.price,
            quantity: order.quantity,
            margin: order.margin || null,
            postfix: order.postfix || "", // Set as needed
            dateOfRealisation: order.dateOfRealisation,
            document: {
              connect: {
                documentId: updatedDocument.documentId,
              },
            },
            product: {
              connectOrCreate: {
                where: {
                  id: order.productId,
                },
                create: {
                  productId: order.product.productId,
                  assortment: order.product.assortment,
                  code: order.product.code,
                  kind: order.product.kind,
                  type: order.product.type,
                  unit: order.product.unit,
                  productCode: order.product.productCode,
                  ...((order.product.productCode === "TPD" ||
                    order.product.productCode === "TPD32") && {
                    tape: {
                      create: {
                        tapeLong: order.product.tape?.tapeLong || null,
                        tapeWidth: order.product.tape?.tapeWidth || null,
                        tapeThickness:
                          order.product.tape?.tapeThickness || null,
                        numberOfColors:
                          order.product.tape?.numberOfColors || null,
                        glue: order.product.tape?.glue || "",
                        tapeColor: order.product.tape?.tapeColor || "",
                        color1: order.product.tape?.color1 || "",
                        color2: order.product.tape?.color2 || "",
                        color3: order.product.tape?.color3 || "",
                        dateOfAcceptation:
                          order.product.tape?.dateOfAcceptation ?? null,
                        printName: order.product.tape?.printName || "",
                      },
                    },
                  }),
                  ...((order.product.productCode === "FSM" ||
                    order.product.productCode === "FSMG" ||
                    order.product.productCode === "FSRG") && {
                    stretch: {
                      create: {
                        sleeve: order.product.stretch?.sleeve || null,
                        stretchThickness:
                          order.product.stretch?.stretchThickness || null,
                        netWeight: order.product.stretch?.netWeight || null,
                        grossWeight: order.product.stretch?.grossWeight || null,
                        stretchColor: order.product.stretch?.stretchColor || "",
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
      success: "Document with items updated successfully.",
      data: { ...updatedDocument, orders: orders },
    };
  } catch (error) {
    console.error("Error updating document with items:", error);
    throw new Error("Failed to update document with items.");
  }
};
