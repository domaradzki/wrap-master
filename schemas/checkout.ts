import { z } from "zod";

const companySchema = z.object({
  name: z.string(),
  companyId: z.number(),
  deliveryAddress: z.string(),
});

const productSchema = z.object({
  assortment: z.string(),
  code: z.string(),
  kind: z.string(),
  netValue: z.number(),
  orderId: z.number(),
  price: z.number(),
  productId: z.number(),
  quantity: z.number(),
  type: z.string(),
  unit: z.string(),
  productCode: z.string(),
  glue: z.string().optional(),
  numberOfColors: z.number().optional(),
  postfix: z.string().optional(),
  tapeColor: z.string().optional(),
  tapeLong: z.number().optional(),
  tapeThickness: z.number().optional(),
  tapeWidth: z.number().optional(),
  stretchThickness: z.number().optional(),
  sleeve: z.number().optional(),
  netWeight: z.number().optional(),
  grossWeight: z.number().optional(),
  stretchColor: z.string().optional(),
});

export const orderSchema = z.object({
  assortment: z.string().optional(),
  code: z.string(),
  dateOfRealisation: z.date(),
  kind: z.string(),
  netValue: z.number(),
  orderId: z.number(),
  price: z.number(),
  product: productSchema,
  productId: z.number(),
  quantity: z.number(),
  type: z.string(),
  unit: z.string(),
});

export const documentSchema = z.object({
  closed: z.boolean(),
  company: companySchema,
  currency: z.string(),
  dateInsert: z.string(),
  details: z.string(),
  documentId: z.number(),
  documentStatus: z.number(),
  exchangeRate: z.number().nullable(),
  orders: z.array(orderSchema),
  signature: z.string(),
  symbol: z.string(),
  timestamp: z.number(),
  trader: z.string(),
});
