import pool from "db";
import { getToken } from "next-auth/jwt";

export async function PUT(req){
  try{
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        
    if(!token || !token.id){
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    if(!body.name || !body.username){
      return new Response(JSON.stringify({ error: "Bad request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newData = await pool.query(`UPDATE users SET name = $1, username = $2 WHERE id = $3 RETURNING name, username`, [body.name, body.username, token.id]);

    console.log(newData)
    
    return Response.json({ data: "xd" });
  }catch(error){
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}