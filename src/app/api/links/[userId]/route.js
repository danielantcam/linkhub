import pool from "db";

export async function GET(req, { params }){
  try{
    const { userId } = await params;
    const { rows: links } = await pool.query(
      "SELECT id, title, url FROM links WHERE user_id = $1",
      [userId]
    );

    return Response.json({ links });
  }catch(error){
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}