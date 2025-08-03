import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getToken } from "next-auth/jwt";
import db from "db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    
    if(!token || !token.id){
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile-photos" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    await db.query(`UPDATE users SET image = $1 WHERE id = $2`, [uploadResult.secure_url, token.id]);

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Error uploading:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
