import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Parse the JSON string back into an object
    const dataString = formData.get("data");
    const data = JSON.parse(dataString);

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Handle file uploads and save metadata in DB
    // const ordersWithFiles = await Promise.all(
    //   data.orders.map(async (order, index) => {
    const file = formData.get("file");

    if (file) {
      // Write file to uploads directory
      const filePath = path.join(uploadDir, file.name);
      await fs.writeFile(filePath, new Uint8Array(await file.arrayBuffer()));

      // Save order with file information in DB here if needed.
      return { filename: file.name }; // Include filename in order object.
    }

    // return order; // Return unchanged order if no file.
    //   })
    // );

    // Now save document and orders with filenames in DB as before.

    return NextResponse.json({
      success: "Plik added successfully.",
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ error: "Failed to upload files." });
  }
}
