import { z } from "zod"; // Import zod if you're using it for validation

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  companyId: z.number(),
});

export const StretchSchema = z
  .object({
    id: z.string(),
    grossWeight: z.number().optional().nullable(),
    netWeight: z.number().optional().nullable(),
    roller: z.string().optional().nullable(),
    sleeve: z.number().optional().nullable(),
    stretchColor: z.string().optional().nullable(),
    stretchThickness: z.number().optional().nullable(),
  })
  .nullable();

export const TapeSchema = z
  .object({
    id: z.string(),
    tapeId: z.number(),
    tapeLong: z.number(),
    tapeWidth: z.number(),
    tapeThickness: z.number(),
    numberOfColors: z.number(),
    glue: z.string(),
    tapeColor: z.string(),
    color1: z.string().optional().nullable(),
    color2: z.string().optional().nullable(),
    color3: z.string().optional().nullable(),
    dateOfAcceptaion: z.string().optional().nullable(),
    printName: z.string().optional().nullable(),
  })
  .nullable();

export const ProductSchema = z.object({
  id: z.string(),
  productId: z.number(),
  assortment: z.string(),
  code: z.string(),
  kind: z.string(),
  type: z.string(),
  productCode: z.string(),
  tape: TapeSchema,
  stretch: StretchSchema,
});

export const OrderSchema = z.object({
  id: z.string(),
  orderId: z.number(),
  code: z.string(),
  kind: z.string(),
  margin: z.number(),
  price: z.number(),
  netValue: z.number(),
  type: z.string(),
  quantity: z.number(),
  unit: z.string(),
  dateOfRealisation: z.string(),
  postfix: z.string().optional(),
  product: ProductSchema,
});

export const DocumentSchema = z.object({
  id: z.string(),
  closed: z.boolean(),
  companyId: z.string(),
  company: CompanySchema,
  currency: z.string(),
  dateInsert: z.date(),
  deliveryAddress: z.string(),
  details: z.string(),
  documentId: z.number(),
  documentStatus: z.number(),
  exchangeRate: z.number().optional().nullable(),
  paymentMethod: z.string(),
  signature: z.string(),
  symbol: z.string(),
  timestamp: z.number(),
  trader: z.string(),
  transport: z.string(),
  paymentDate: z.date().optional().nullable(),
  orders: z.array(OrderSchema),
});
