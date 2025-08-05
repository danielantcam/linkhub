import "globals.css";
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: "LinkHUB",
  description: "Share all your links at once.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="
        bg-neutral-950 px-6
        sm:px-8
        md:px-24
        xl:px-50
        2xl:px-60
        3xl:px-90
      ">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
