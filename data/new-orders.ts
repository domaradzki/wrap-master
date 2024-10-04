import { reduceDocuments } from "@/lib/reducer";
// import { getIdsDocuments } from "@/data/db-documents";

export const newOrdersFetch = async () => {
  // const documents = await getIdsDocuments();
  const response = await fetch("../../orders.json");
  // const response = await fetch("/api/orders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  const reduced = reduceDocuments(data);
  // console.log(documents);
  return reduced;
};
