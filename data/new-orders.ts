import { reduceDocuments } from "@/lib/reducer";

export const newOrdersFetch = async () => {
  const response = await fetch("../../orders.json");
  // const response = await fetch("/api/orders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  return reduceDocuments(data);
};
