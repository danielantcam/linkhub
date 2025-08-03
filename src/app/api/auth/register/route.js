import { v4 as uuidv4 } from "uuid";
import pool from "db";

export async function POST(req){
  try{
    const body = await req.json();
    if(!body.username || !body.email || !body.name){
      return new Response(JSON.stringify({ error: "Bad request, arguments missing." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
    }

    const res = await pool.query(
      "SELECT id, username FROM users WHERE email = $1",
      [body.email]
    );
    const dbUser = res.rows[0];

    if(!dbUser){
      await pool.query(
        "INSERT INTO users (id, email, username, name, image) VALUES ($1, $2, $3, $4, $5)",
        [uuidv4(), body.email, body.username, body.name, body.image ?? null]
      );

      return Response.json({ message: "Registered successfully." });
    }

    return Response.json({ message: "Already registered." });
  }catch(error){
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
