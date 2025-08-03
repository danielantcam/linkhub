"use client"

import useMyProfile from "hooks/useMyProfile";
import { useEffect, useState } from "react";

export default function CreateLinkWrapper({ links, setLinks, createLinkRef }){
  const isMine = useMyProfile();

  return <>
    { isMine && <CreateLink links={links} setLinks={setLinks} createLinkRef={createLinkRef}/> }
  </>;
}

function CreateLink({ links, setLinks, createLinkRef }){
  const [ open, setOpen ] = useState(false);

  useEffect(()=>{
    createLinkRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, createLinkRef]);

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get("title");
    const url = data.get("url");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        url
      })
    });

    if(res.ok){
      setOpen(false);
      const { newLink } = await res.json();
      setLinks([ ...links, newLink ]);
    }
  }

  return (
    open
      ? <form onSubmit={handleSubmit} ref={createLinkRef} className="bg-neutral-900 border-2 border-neutral-800 px-10 py-8 rounded-xl h-fit flex flex-col gap-3">
          <span className="text-white font-semibold text-2xl mb-2">Add a link to your profile</span>
          <label htmlFor="title" className="sr-only" >Title</label>
          <input type="text" id="title" name="title" placeholder="This is an example title" className="h-12 text-white border-2 border-neutral-700 rounded-md px-6 font-semibold" />
          <label htmlFor="url" className="sr-only" >URL</label>
          <input type="url" id="url" name="url" placeholder="https://example.com" className="h-12 text-white border-2 border-neutral-700 rounded-md px-6 font-semibold" />
          <div className="flex gap-4">
            <button onClick={()=> setOpen(false)} type="button" className="h-12 w-40 text-white border-2 border-neutral-700 rounded-md px-6 font-semibold">Discard</button>
            <button type="submit" className="w-60 h-12 bg-neutral-200 font-bold text-lg text-neutral-800 rounded-md" >Create</button>
          </div>
        </form>
      : <button
          onClick={() => setOpen(true)}
          className="border-2 border-dashed border-neutral-800 px-10 h-18 rounded-xl flex justify-center items-center text-neutral-400 font-semibold text-xl cursor-pointer hover:text-neutral-300 hover:border-neutral-300 hover:border-solid transition-colors"
        >
          Add a new link
        </button>
  );
}