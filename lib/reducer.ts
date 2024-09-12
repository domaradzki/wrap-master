interface Document {
  client: string;
  closed: boolean;
  code: string;
  companyId: number;
  currency: string;
  dateInsert: string;
  deliveryAddress: string;
  details: string;
  documentId: number;
  documentStatus: number;
  exchangeRate: null | number;
  orderId: number;
  productId: string;
  kind: string;
  netValue: number;
  price: number;
  quantity: number;
  signature: string;
  symbol: string;
  trader: string;
  type: string;
  unit: string;
  assortment: string;
  TimeStamp: { data: number[] };
}

export interface ReducedDocument {
  documentId: number;
  documentStatus: number;
  symbol: string;
  signature: string;
  currency: string;
  dateInsert: string;
  details: string;
  exchangeRate: null | number;
  closed: boolean;
  timestamp: number;
  trader: string;
  company: {
    name: string;
    companyId: number;
    deliveryAddress: string;
  };
  orders: {
    orderId: number;
    quantity: number;
    price: number;
    netValue: number;
    productId: string;
    code: string;
    assortment: string;
    unit: string;
    type: string;
    kind: string;
  }[];
}

export const reduceDocuments = (documents: Document[]): ReducedDocument[] => {
  return documents.reduce((acc, current) => {
    const existingDocument = acc.find(
      (doc) => doc.documentId === current.documentId
    );

    if (existingDocument) {
      existingDocument.orders.push({
        orderId: current.orderId,
        quantity: current.quantity,
        price: current.price,
        netValue: current.netValue,
        productId: current.productId,
        code: current.code,
        assortment: current.assortment,
        unit: current.unit,
        type: current.type.toUpperCase(),
        kind: current.kind,
      });
    } else {
      acc.push({
        closed: current.closed,
        currency: current.currency,
        dateInsert: current.dateInsert,
        details: current.details,
        documentId: current.documentId,
        documentStatus: current.documentStatus,
        exchangeRate: current.exchangeRate,
        signature: current.signature,
        symbol: current.symbol,
        trader: current.trader,
        timestamp: current.TimeStamp.data[current.TimeStamp.data.length - 1],
        company: {
          name: current.client,
          companyId: current.companyId,
          deliveryAddress: current.deliveryAddress,
        },
        orders: [
          {
            orderId: current.orderId,
            quantity: current.quantity,
            price: current.price,
            netValue: current.netValue,
            productId: current.productId,
            code: current.code,
            assortment: current.assortment,
            unit: current.unit,
            type: current.type.toUpperCase(),
            kind: current.kind,
          },
        ],
      });
    }

    return acc;
  }, [] as ReducedDocument[]);
};
