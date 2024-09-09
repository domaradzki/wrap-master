import { reduceDocuments } from "@/lib/reducer";
import structureDocumentWithProducts from "@/utils/structure";

export const newOrderActiveFetch = async ({ id }: { id: string }) => {
  const response = await fetch("../../orders.json");
  // const response = await fetch("/api/orders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  const reduced = reduceDocuments(data);
  const [filtered] =
    reduced?.filter((order) => order.documentId === Number(id)) ?? [];
  const activeOrder = structureDocumentWithProducts(filtered);
  return activeOrder;
};
