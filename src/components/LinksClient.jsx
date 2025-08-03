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
  return <li className="bg-neutral-900 border-2 border-neutral-800 px-10 h-20 rounded-xl flex items-center relative group">
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group/link hover:opacity-60 transition-opacity">
      <LinkSVG />
      <span className="text-white font-semibold text-lg group-hover/link:underline">{name}</span>
    </a>
    <DeleteButton id={id} deleteLinkLocally={()=> deleteLinkLocally(id)} />
  </li>;
}