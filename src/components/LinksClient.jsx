"use client"

import { useRef, useState } from "react";
import DeleteButton from "components/DeleteButton";

import LinkSVG from "svg/Link";
import CreateLink from "./CreateLink";

export default function LinksClient({ links }){
  const [ localLinks, setLocalLinks ] = useState(links ?? []);
  const createLink = useRef(null);

  function deleteLinkLocally(id){
    setLocalLinks(localLinks.filter(link=> link.id !== id));
  }

  return <>
    <div className="grow flex flex-col gap-4">
      {
        localLinks.length > 0 && /* list only appears when there's links to show */
          <ul className="flex flex-col gap-4">
            {localLinks.map(link=> <Link name={link.title} url={link.url} id={link.id} deleteLinkLocally={deleteLinkLocally} key={link.id} />)}
          </ul>
      }
      <CreateLink links={localLinks} setLinks={setLocalLinks} createLinkRef={createLink} />
    </div>
  </>;
}

function Link({ id, name, url, deleteLinkLocally }){
  return <li className="
    bg-neutral-900 border-2 border-neutral-800 px-4 min-h-20 py-2 box-border rounded-xl flex justify-between items-center gap-1 group
    sm:px-10
    md:gap-4
    lg:px-12 
  ">
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group/link hover:opacity-60 transition-opacity">
      <LinkSVG className="
        w-6 shrink-0
        md:w-8 md:h-8
      "/>
      <span className="
        text-white font-semibold text-sm group-hover/link:underline
        xs:text-sm
        sm:text-base
        md:text-lg
      ">{name}</span>
    </a>
    <DeleteButton id={id} deleteLinkLocally={()=> deleteLinkLocally(id)} />
  </li>;
}