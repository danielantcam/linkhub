import Navbar from "components/Navbar";
import ProfileCard from "components/ProfileCard";
import Links from "components/Links";

export default async function Profile({ params }){
  const { username } = await params;

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/" + username);
  const user = await response.json();

  return (<>
    <Navbar/>
    <div className="
      py-6 flex flex-col gap-8
      lg:py-10
      xl:gap-20
      lg:flex-row
    ">
      <ProfileCard user={user}/>
      <Links userId={user.id} />
    </div>
  </>);
}

export async function generateMetadata({ params }) {
  const { username } = await params;

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/" + username);
  const user = await response.json();

  return {
    title: `${user.name} (@${username}) - LinkHUB`,
    description: `Visit ${user.name}'s (@${username}) profile on LinkHUB.`,
    openGraph: {
      images: [{ url: user.image }]
    },
    twitter: {
      images: [ user.image ]
    },
    alternates: {
      canonical: `https://linkhub.danielantcam.dev/@${username}`,
    }
  };
}