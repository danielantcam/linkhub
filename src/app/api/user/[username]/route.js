import pool from "db";

export async function GET(req, { params }){
  try{
    const { username } = await params;

    const res = await pool.query(
      "SELECT id, name, image FROM users WHERE username = $1",
      [username]
    );
    const dbUser = res.rows[0];

    if(dbUser) return Response.json({ ...dbUser, username });

    return new Response(JSON.stringify({ message: "User not found." }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }catch(error){
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}