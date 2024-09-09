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
  client: string;
  companyId: number;
  closed: boolean;
  deliveryAddress: string;
  currency: string;
  dateInsert: string;
  details: string;
  documentId: number;
  documentStatus: number;
  exchangeRate: null | number;
  signature: string;
  symbol: string;
  trader: string;
  timestamp: number;
  products: {
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
      existingDocument.products.push({
        orderId: current.orderId,
        quantity: current.quantity,
        price: current.price,
        netValue: current.netValue,
        productId: current.productId,
        code: current.code,
        assortment: current.assortment,
        unit: current.unit,
        type: current.type,
        kind: current.kind,
      });
    } else {
      acc.push({
        client: current.client,
        closed: current.closed,
        companyId: current.companyId,
        currency: current.currency,
        dateInsert: current.dateInsert,
        deliveryAddress: current.deliveryAddress,
        details: current.details,
        documentId: current.documentId,
        documentStatus: current.documentStatus,
        exchangeRate: current.exchangeRate,
        signature: current.signature,
        symbol: current.symbol,
        trader: current.trader,
        timestamp: current.TimeStamp.data[current.TimeStamp.data.length - 1],
        products: [
          {
            orderId: current.orderId,
            quantity: current.quantity,
            price: current.price,
            netValue: current.netValue,
            productId: current.productId,
            code: current.code,
            assortment: current.assortment,
            unit: current.unit,
            type: current.type,
            kind: current.kind,
          },
        ],
      });
    }

    return acc;
  }, [] as ReducedDocument[]);
};
