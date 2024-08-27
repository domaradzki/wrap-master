// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { fetchDataFromMSSQL } from "@/lib/mssql"; // Adjust the import based on your structure

export async function GET() {
  try {
    const orders = await fetchDataFromMSSQL();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}
