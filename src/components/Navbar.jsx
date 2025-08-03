'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logout from "svg/Logout";

export default function Navbar(){
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return <header className="w-full flex justify-between items-center px-60 pt-10">
    <Link href="/" className="text-white text-3xl font-semibold">LinkHUB</Link>
    <nav className="text-white flex items-center gap-8">
      {status === "unauthenticated" && <Link href="/login" className="text-lg font-semibold">Login</Link>}
      {status === "authenticated" &&
        <>
          <Link href={`/@${session.user.username}`} className="flex items-center gap-2 group p-2">
            <img src={session?.user?.image ?? "/unknown-user.webp"} alt={session?.user?.name + " profile photo"} className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-lg group-hover:underline group-hover:opacity-60 transition-opacity">
              {session?.user?.name}
            </span>
          </Link>
          <button className="p-2 cursor-pointer group" onClick={()=> signOut()}>
            <Logout className="w-6 h-6 group-hover:opacity-60 transition-opacity"/>
          </button>
        </>
      }
    </nav>
  </header>;
}