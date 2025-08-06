'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logout from "svg/Logout";
import Person from "svg/Person";

export default function Navbar(){
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return <header className="
    w-full flex justify-between items-center pt-8
    lg:pt-10
  ">
    <Link href="/" className="text-white text-3xl font-semibold">LinkHUB</Link>
    <nav className="
      text-white flex items-center gap-1
      md:gap-2
      xl:gap-4
    ">
      {
        status === "unauthenticated" && <Link href="/login" className="bg-neutral-800 py-1 px-3 rounded-md font-semibold flex items-center gap-2">
          <Person className="w-6 h-6"/>
          Login
        </Link>
      }
      {status === "authenticated" &&
        <>
          <Link href={`/@${session.user.username}`} className="flex items-center gap-2 p-2 group font-semibold">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={session?.user?.image ?? "/unknown-user.webp"} alt={session?.user?.name + " profile photo"} className="object-cover w-full h-full" />
            </div>
            <span className="hidden group-hover:underline group-hover:opacity-60 transition-opacity md:inline">
              {`@${session?.user?.username}`}
            </span>
          </Link>
          <button className="p-2 cursor-pointer group" onClick={()=> signOut()} aria-label="Log out">
            <Logout className="w-6 h-6 group-hover:opacity-60 transition-opacity"/>
          </button>
        </>
      }
    </nav>
  </header>;
}