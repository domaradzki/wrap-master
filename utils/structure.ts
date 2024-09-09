function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const structureDocumentWithProducts = (document) => {
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

  for (let i = 0; i < document.products.length; i++) {
    const product = document.products[i];
    let item = {
      netWeight: 0,
      sleeve: 0,
      stretchThickness: 0,
      grossWeight: 0,
      stretchColor: "",
      tapeColor: "",
      postfix: "",
      productCode: "",
      tapeLong: 0,
      tapeWidth: 0,
      tapeThickness: 0,
      numberOfColors: 0,
      glue: "",
    };

    if (product.kind === "KT") {
      const code = product.code.toUpperCase();
      const productArray = code.split(" ");
      const productCode = productArray[0];
      const productSize = productArray[1];

      // Rule for FSRG
      if (productCode === "FSRG") {
        if (productSize === "OCEANIC") {
          item = {
            sleeve: productArray[2],
            postfix: productArray[1],
          };
        } else {
          const size = productSize.split("/");
          item = {
            sleeve: +size[1],
            stretchThickness: +size[0].slice(3),
            netWeight: +size[0].slice(0, 3) / 100,
            grossWeight: 0,
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
          };
        }
      }

      // Rule for FSMG
      if (productCode === "FSMG") {
        item = {
          stretchThickness: +productSize.slice(4),
          sleeve: 1600,
          grossWeight: +productSize.slice(0, 4) / 100,
          netWeight: +(productSize.slice(0, 4) - 160) / 100,
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
        };
      }

      // Rule for FSM
      if (productCode === "FSM") {
        item = {
          stretchThickness: +productSize.slice(3),
          sleeve: 1600,
          grossWeight: +productSize.slice(0, 3) / 10,
          netWeight: +(productSize.slice(0, 3) - 16) / 10,
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
        };
      }

      // Rule for TPD
      if (productCode === "TPD" || productCode === "TPD32") {
        const ind =
          productSize.indexOf("F") !== -1
            ? productSize.indexOf("F")
            : productSize.indexOf("H");
        item = {
          productCode,
          tapeLong: +productSize.slice(0, ind - 2),
          tapeWidth: +productSize.slice(ind - 2, ind),
          tapeThickness: productCode === "TPD32" ? 32 : 28,
          numberOfColors: productSize.slice(-1),
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
        };
      }
    }

    const dataOrder = {
      ...product,
      tapeColor:
        typeof product.tapeColor === "function"
          ? product.tapeColor()
          : product.tapeColor,
      grossWeight:
        typeof product.grossWeight === "function"
          ? product.grossWeight()
          : product.grossWeight,
      stretchColor:
        typeof product.stretchColor === "function"
          ? product.stretchColor()
          : product.stretchColor,
      postfix:
        typeof product.postfix === "function"
          ? product.postfix()
          : product.postfix,
      dateOfRealisation:
        product.productCode === "TPD" || product.productCode === "TPD32"
          ? addDays(new Date(dateInsert), 14)
          : addDays(new Date(dateInsert), 3),
    };

    products.push({ ...dataOrder, ...item });
  }

  document.products = products;

  return { ...document };
};

export default structureDocumentWithProducts;
