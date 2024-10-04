import { reduceDocuments } from "@/lib/reducer";

export const newOrdersFetch = async () => {
  const response = await fetch("../../orders.json");
  const documents = await fetch("/api/dborders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  const reduced = reduceDocuments(data);

  const docs = await documents.json();
  const docsIds = docs.map((doc: any) => doc.documentId);
  const onlyNewDocuments = reduced.filter((doc) => {
    return !docsIds.includes(doc.documentId);
  });

  return onlyNewDocuments;
};
