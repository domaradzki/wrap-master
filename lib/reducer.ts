interface Document {
  assortment: string;
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
  itemId: number;
  itemRef: string;
  kind: string;
  netValue: number;
  price: number;
  quantity: number;
  signature: string;
  symbol: string;
  trader: string;
  type: string;
  unit: string;
  TimeStamp: { data: number[] };
}

export interface ReducedDocument {
  assortment: string;
  client: string;
  closed: boolean;
  companyId: number;
  currency: string;
  dateInsert: string;
  deliveryAddress: string;
  details: string;
  documentId: number;
  documentStatus: number;
  exchangeRate: null | number;
  signature: string;
  symbol: string;
  trader: string;
  timestamp: number;
  products: {
    itemId: number;
    quantity: number;
    price: number;
    netValue: number;
    itemRef: string;
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
        itemId: current.itemId,
        quantity: current.quantity,
        price: current.price,
        netValue: current.netValue,
        itemRef: current.itemRef,
        code: current.code,
        assortment: current.assortment,
        unit: current.unit,
        type: current.type,
        kind: current.kind,
      });
    } else {
      acc.push({
        assortment: current.assortment,
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
            itemId: current.itemId,
            quantity: current.quantity,
            price: current.price,
            netValue: current.netValue,
            itemRef: current.itemRef,
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
