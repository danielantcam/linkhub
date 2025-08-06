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
    <button onClick={deleteLink} aria-label="Delete link" className="flex items-center justify-center bg-neutral-900 border-2 border-neutral-800 aspect-square p-2 rounded-full cursor-pointer hover:border-red-500 hover:bg-red-500 transition-colors">
      <Trash className="w-6 h-6"/>
    </button>
  }</>;
}