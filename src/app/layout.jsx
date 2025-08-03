import "globals.css";
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: "LinkHUB",
  description: "Share all your links at once.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
