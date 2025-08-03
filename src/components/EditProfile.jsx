"use client"

import Link from "next/link";
import useMyProfile from "hooks/useMyProfile";

export default function EditProfile(){
  const isMine = useMyProfile();

  return <>{
    isMine && <Link href="/me" className="text-neutral-300 font-light hover:underline hover:opacity-60 transition-opacity">
      Edit profile
    </Link>
  }</>;
}