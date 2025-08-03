"use client"

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GitHub from "svg/GitHub";
import Google from "svg/Google";

export default function Login(){
  const { status, data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/@${session?.user?.username}`);
    }
  }, [status, router]);

  return <div className="w-full h-screen flex justify-center items-center">
    <main className="bg-neutral-900 border-2 border-neutral-800 p-10 rounded-xl">
      <section className="flex flex-col gap-2">
        <button onClick={()=> signIn("github")} className="flex justify-center items-center gap-3 text-xl text-white font-semibold h-14 w-sm border-2 border-neutral-700 rounded-md cursor-pointer hover:border-neutral-200 transition-colors">
          GitHub
          <GitHub/>
        </button>
        <button onClick={()=> signIn("google")} className="flex justify-center items-center gap-3 text-xl text-white font-semibold h-14 w-sm border-2 border-neutral-700 rounded-md cursor-pointer hover:border-neutral-200 transition-colors">
          Google
          <Google/>
        </button>
      </section>

      <div className="flex items-center gap-2 text-white my-6">
        <hr className="grow border-white" />
        <span className="font-semibold">or log in with an email</span>
        <hr className="grow border-white" />
      </div>

      <form className="flex flex-col gap-2">
        <input type="email" placeholder="Email" className="h-14 w-sm text-white border-2 border-neutral-700 rounded-md px-6 font-semibold" />
        <button className="h-14 w-sm bg-neutral-200 font-bold text-lg text-neutral-800 rounded-md cursor-pointer hover:bg-neutral-900 hover:border-2 hover:border-neutral-800 hover:text-white transition-colors">Login</button>
      </form>
    </main>
  </div>;  
}