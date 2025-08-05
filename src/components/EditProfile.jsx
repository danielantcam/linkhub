"use client"

import Link from "next/link";
import useMyProfile from "hooks/useMyProfile";

export default function EditProfile(){
  const isMine = useMyProfile();

  return <>{
    isMine && <Link href="/me" className="block w-fit bg-neutral-300 border-neutral-300 text-neutral-900 text-sm font-semibold px-2 rounded-xl mt-4 hover:bg-neutral-900 border-2 hover:border-neutral-800 hover:text-white transition-colors">
      Edit profile
    </Link>
  }</>;
}