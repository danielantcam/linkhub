"use client"

import Trash from "svg/Trash";
import useMyProfile from "hooks/useMyProfile";

export default function DeleteButton({ id, deleteLinkLocally }){
  const isMine = useMyProfile();

  async function deleteLink(){
    await fetch("/api/links", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    deleteLinkLocally();
  }

  return <>{
    isMine && 
    <button onClick={deleteLink} className="opacity-0 group-hover:opacity-100 focus:opacity-100 select flex items-center justify-center bg-neutral-900 border-2 border-neutral-800 aspect-square p-2 rounded-full absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:bg-red-500 transition-all">
      <Trash className="w-6 h-6"/>
    </button>
  }</>;
}