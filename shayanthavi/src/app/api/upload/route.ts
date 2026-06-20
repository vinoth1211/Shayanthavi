import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAuth } from "@/lib/api-auth";

export async function POST(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      // Fallback for local dev without Blob: save reference path
      const filename = `/assets/uploads/${Date.now()}-${file.name}`;
      return NextResponse.json({
        url: filename,
        message: "BLOB_READ_WRITE_TOKEN not set — using local path placeholder",
      });
    }

    const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, {
      access: "public",
      token,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
