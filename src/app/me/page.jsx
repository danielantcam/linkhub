"use client"

import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Me(){
  const { data: session } = useSession();
  const [preview, setPreview] = useState();
  const router = useRouter();

  async function uploadImage() {
    const file = document.querySelector("#file").files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/user/upload-pfp", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPfp(data.url);
    }catch{
      console.error("Error when uploading image");
    }
  }

  async function updateData(data){
    if(data.name === session?.user?.name && data.username === session?.user?.username) return;
    const name = data.get("name");
    const username = data.get("username");
    try{
      const { data } = await fetch("/api/user/update", {
        method: "PUT",
        body: JSON.stringify({
          name,
          username
        })
      });
      return data;
    }catch(error){
      console.error("Error when updating data");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    await uploadImage();
    const data = new FormData(event.target);
    await updateData(data);
    const updatedSession = await getSession({ triggerEvent: true });
    router.push(`/@${updatedSession?.user?.username}`);
  }

  return <main className="flex justify-center">
    <form onSubmit={handleSubmit} className="
      w-fit h-fit flex flex-col gap-6 mt-12
      md:bg-neutral-900 md:border-2 md:border-neutral-800 md:py-10 md:px-20 md:rounded-xl
    ">
      <h1 className="text-4xl text-white font-semibold mb-4">Update your profile</h1>
      <fieldset className="
        flex flex-col items-center gap-6
      ">
        <legend className="sr-only">User details</legend>
        <label htmlFor="file" tabIndex={0} aria-label="Change profile photo" className="rounded-full w-60 aspect-square overflow-hidden hover:brightness-50 transition-all cursor-pointer">
          <img src={preview ?? session?.user?.image ?? "/unknown-user.webp"} alt={`${session?.user?.username}'s profile photo`} className="object-cover w-full h-full" />
        </label>
        <input id="file" type="file" name="image" onChange={handleImageChange} className="hidden" />
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="text-white text-lg font-semibold">Name</label>
          <input name="name" id="name" type="text" placeholder="Your name" className="h-14 text-white border-2 border-neutral-700 rounded-md px-6 font-semibold mb-4 mt-1" defaultValue={session?.user?.name} />
          <label htmlFor="username" className="text-white text-lg font-semibold">Username</label>
          <input name="username" id="username" type="text" placeholder="@username" className="h-14 text-white border-2 border-neutral-700 rounded-md px-6 font-semibold mb-4 mt-1" defaultValue={session?.user?.username} />
        </div>
      </fieldset>
      <div className="flex justify-between">
        <Link href={`/@${session?.user?.username}`} className="py-2 px-10 text-white border-2 border-neutral-700 rounded-md font-semibold">Discard</Link>
        <button type="submit" className="py-2 px-10 bg-neutral-200 font-bold text-lg text-neutral-800 rounded-md cursor-pointer hover:bg-neutral-900 border-2 border-transparent hover:border-neutral-800 hover:text-white transition-colors">Save</button>
      </div>
    </form>
  </main>;
}