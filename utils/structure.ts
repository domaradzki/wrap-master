export function structureDocumentWithProducts(data) {
  // Helper function to safely split strings
  const safeSplit = (str) =>
    str && typeof str === "string"
      ? str.split(",").map((item) => item.trim())
      : [];

  // Split the comma-separated strings into arrays
  const assortments = safeSplit(data.assortments);
  const codes = safeSplit(data.codes);
  const itemIds = safeSplit(data.itemIds);
  const kinds = safeSplit(data.kinds);
  const netValues = safeSplit(data.netValues).map((item) => parseFloat(item));
  const prices = safeSplit(data.prices).map((item) => parseFloat(item));
  const quantities = safeSplit(data.quantities).map((item) => parseFloat(item));
  const types = safeSplit(data.types);
  const units = safeSplit(data.units);

  // Create an array of product objects
  const products = assortments.map((assortment, index) => ({
    assortment,
    code: codes[index] || null,
    itemId: itemIds[index] || null,
    kind: kinds[index] || null,
    netValue: netValues[index] || null,
    price: prices[index] || null,
    quantity: quantities[index] || null,
    type: types[index] || null,
    unit: units[index] || null,
  }));

  // Return the structured document object
  return {
    documentId: data.documentId,
    dateInsert: data.dateInsert,
    signature: data.signature,
    symbol: data.symbol,
    details: data.details,
    closed: data.closed,
    documentStatus: data.documentStatus,
    client: data.client,
    companyId: data.companyId,
    trader: data.trader,
    deliveryAddress: data.deliveryAddress,
    currency: data.currency,
    exchangeRate: data.exchangeRate,
    numberOfDocumentInvoices: data.numberOfDocumentInvoices,
    products, // Include the array of products
  };
}
