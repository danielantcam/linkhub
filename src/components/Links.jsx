import LinksClient from "./LinksClient";

export default async function Links({ userId }){
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/links/" + userId);
  const { links } = await response.json();

  return <LinksClient links={links} />
}