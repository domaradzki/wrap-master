import { ReducedDocument } from "@/lib/reducer";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

interface Company {
  name: string;
  companyId: number;
  deliveryAddress: string;
}

interface Product {
  assortment: string;
  code: string;
  kind: string;
  netValue: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
  type: string;
  unit: string;
  productCode: string;
  glue?: string; // Optional field
  numberOfColors?: number; // Optional field
  postfix?: string; // Optional field
  tapeColor?: string; // Optional field
  tapeLong?: number; // Optional field
  tapeThickness?: number; // Optional field
  tapeWidth?: number; // Optional field
  stretchThickness?: number; // Optional field
  sleeve?: number; // Optional field
  netWeight?: number; // Optional field
  grossWeight?: number; // Optional field
  stretchColor?: string; // Optional field
}

export interface Order {
  assortment?: string;
  code: string;
  dateOfRealisation: Date; // Use Date type for date
  kind: string;
  netValue: number;
  orderId: number;
  price: number;
  product: Product; // Product object
  productId: number;
  quantity: number;
  type: string;
  unit: string;
}

export interface Document {
  closed: boolean;
  company: Company;
  currency: string;
  dateInsert: string; // Use string for ISO date format
  details: string;
  documentId: number;
  documentStatus: number;
  exchangeRate: number | null; // Assuming it can be null
  orders: Order[]; // Array of orders
  signature: string;
  symbol: string;
  timestamp: number;
  trader: string;
}

const structureDocumentWithProducts = (document: ReducedDocument) => {
  if (!document) return {};

  const { dateInsert } = document;

  const colors: { [key: string]: string } = {
    CZ: "czarna",
    CZARNA: "czarna",
    RÓŻ: "różowa",
    B: "biała",
    BIAŁA: "biała",
    NIEB: "niebieska",
    ŻÓŁT: "żółta",
    ZIELO: "zielona",
    CZERW: "czerwona",
    POM: "pomarańczowa",
    _: "transparentna",
    T: "transparentna",
    BR: "brązowa",
  };

  let products: any[] = [];

  for (let i = 0; i < document.orders.length; i++) {
    const product = document.orders[i];
    let order: any = {
      orderId: product.orderId,
      quantity: product.quantity,
      price: product.price,
      netValue: product.netValue,
      documentId: document.documentId,
      product: {
        assortment: product.assortment,
        productId: product.productId,
        type: product.type,
        code: product.code,
        unit: product.unit,
        kind: product.kind,
      },
    };

    if (product.kind === "KT") {
      const code = product.code.toUpperCase();
      const productArray = code.split(" ");
      const productCode = productArray[0];
      const productSize = productArray[1];

      // Rule for FSRG
      if (productCode === "FSRG") {
        if (productSize === "OCEANIC") {
          order.product.sleeve = productArray[2];
          order.product.postfix = productArray[1];
          order.product.productCode = productCode;
        } else {
          const size = productSize.split("/");
          order = {
            ...order,
            product: {
              ...order.product,
              productCode,
              assortment: product.assortment,
              sleeve: +size[1],
              stretchThickness: +size[0].slice(3),
              netWeight: +size[0].slice(0, 3) / 100,
              grossWeight: function () {
                return this.netWeight + this.sleeve / 1000;
              },
              stretchColor: colors.hasOwnProperty(productArray[2])
                ? colors[productArray[2]]
                : colors._,
              postfix: (() => {
                const length = productArray.length;
                let str = "";
                for (let i = 2; i < length; i++) {
                  str += productArray[i];
                  str += " ";
                }
                return str;
              })(),
            },
          };
        }
      }

      // Rule for FSMG
      if (productCode === "FSMG") {
        order = {
          ...order,
          product: {
            ...order.product,
            productCode,
            assortment: product.assortment,
            stretchThickness: +productSize.slice(4),
            sleeve: 1600,
            grossWeight: +productSize.slice(0, 4) / 100,
            netWeight: (parseInt(productSize.slice(0, 4)) - 160) / 100,
            stretchColor: colors.hasOwnProperty(productArray[2])
              ? colors[productArray[2]]
              : colors._,
            postfix: (() => {
              const length = productArray.length;
              let str = "";
              for (let i = 2; i < length; i++) {
                str += productArray[i];
                str += " ";
              }
              return str;
            })(),
          },
        };
      }

      // Rule for FSM
      if (productCode === "FSM") {
        order = {
          ...order,
          product: {
            ...order.product,
            productCode,
            assortment: product.assortment,
            stretchThickness: +productSize.slice(3),
            sleeve: 1600,
            grossWeight: +productSize.slice(0, 3) / 10,
            netWeight: (parseInt(productSize.slice(0, 3)) - 16) / 10,
            stretchColor: colors.hasOwnProperty(productArray[2])
              ? colors[productArray[2]]
              : colors._,
            postfix: (() => {
              const length = productArray.length;
              let str = "";
              for (let i = 2; i < length; i++) {
                str += productArray[i];
                str += " ";
              }
              return str;
            })(),
          },
        };
      }

      // Rule for TPD
      if (productCode === "TPD" || productCode === "TPD32") {
        const ind =
          productSize.indexOf("F") !== -1
            ? productSize.indexOf("F")
            : productSize.indexOf("H");
        order = {
          ...order,
          product: {
            ...order.product,
            assortment: product.assortment,
            productCode,
            tapeLong: +productSize.slice(0, ind - 2),
            tapeWidth: +productSize.slice(ind - 2, ind),
            tapeThickness: productCode === "TPD32" ? 32 : 28,
            numberOfColors: Number(productSize.slice(-1)),
            glue: productSize.slice(ind, ind + 1),
            tapeColor: (() => {
              const indR =
                productSize.indexOf("R") !== -1
                  ? productSize.indexOf("R") + 1
                  : ind + 2;
              const colorSymbol = productSize.slice(ind + 1, indR);
              if (colors.hasOwnProperty(colorSymbol)) {
                return colors[colorSymbol];
              } else {
                return colors._;
              }
            })(),
            postfix: (() => {
              const length = productArray.length;
              let str = "";
              for (let i = 2; i < length; i++) {
                str += productArray[i];
                str += " ";
              }
              return str;
            })(),
          },
        };
      }
    } else {
      order.product.productCode = "TW";
    }

    products.push({ ...order });
  }
  const adjustedProducts = products.map((product) => {
    if (
      product.product.productCode === "TPD" ||
      product.product.productCode === "TPD32"
    ) {
      return {
        ...product,
        product: {
          ...product.product,
          tapeColor:
            typeof product.product.tapeColor === "function"
              ? product.product.tapeColor()
              : product.product.tapeColor,
          postfix:
            typeof product.product.postfix === "function"
              ? product.product.postfix()
              : product.product.postfix,
          assortment: product.product.assortment,
        },
        dateOfRealisation: addDays(new Date(dateInsert), 14),
      };
    } else if (
      product.product.productCode === "FSM" ||
      product.product.productCode === "FSMG" ||
      product.product.productCode === "FSRG"
    ) {
      {
        return {
          ...product,
          product: {
            ...product.product,
            grossWeight:
              typeof product.product.grossWeight === "function"
                ? product.product.grossWeight()
                : product.product.grossWeight,
            postfix:
              typeof product.product.postfix === "function"
                ? product.product.postfix()
                : product.product.postfix,
            assortment: product.product.assortment,
          },
          dateOfRealisation: addDays(new Date(dateInsert), 2),
        };
      }
    } else {
      return {
        ...product,
        dateOfRealisation: addDays(new Date(dateInsert), 3),
      };
    }
  });

  document.orders = adjustedProducts;

  return { ...document };
};

export default structureDocumentWithProducts;
