import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import pool from "db";
import { v4 as uuidv4 } from "uuid";

function generateUsername(base = "user") {
  const clean = base.toLowerCase().replace(/[^a-z0-9]/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${clean}${random}`;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: true,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const res = await pool.query("SELECT * FROM users WHERE email = $1", [user.email]);
        let dbUser = res.rows[0];

        if (!dbUser) {
          const username = generateUsername(user.email.split("@")[0]);
          const result = await pool.query(
            `INSERT INTO users (id, email, name, image, username)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, name, image`,
            [uuidv4(), user.email, user.name, user.image, username]
          );
          dbUser = result.rows[0];
        }

        token.id = dbUser.id;
      }

      if (token?.id) {
        const res = await pool.query(
          "SELECT username, name, image FROM users WHERE id = $1",
          [token.id]
        );
        const dbUser = res.rows[0];

        token.username = dbUser?.username || token.username;
        token.name = dbUser?.name || token.name;
        token.image = dbUser?.image || token.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Pasas la info del token a session.user
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },
});
