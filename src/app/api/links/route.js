import pool from "db";
import { getToken } from "next-auth/jwt";

export async function POST(req){
  try{
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if(!token || !token.id){
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    if(!body.title || !body.url){
      return new Response(JSON.stringify({ error: "Arguments missing." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
    }

    const { rows } = await pool.query(
      "INSERT INTO links (user_id, title, url) VALUES ($1, $2, $3) RETURNING id",
      [token.id, body.title, body.url]
    );

    const newLink = rows[0];

    return Response.json({ newLink: { id: newLink.id, title: body.title, url: body.url } });
  }catch(error){
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function DELETE(req){
  try{
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if(!token || !token.id){
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    if(!body.id){
      return new Response(JSON.stringify({ error: "Arguments missing." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
    }

    await pool.query(
      "DELETE FROM links WHERE id = $1 AND user_id = $2",
      [body.id, token.id]
    );

    return Response.json({ message: "Link deleted successfully." });
  }catch(error){
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}