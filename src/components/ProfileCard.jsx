import EditProfile from "./EditProfile";

export default function ProfileCard({ user }){
  return <header className="bg-neutral-900 border-2 border-neutral-800 p-10 rounded-xl h-fit">
    <section aria-labelledby="profile-heading" className="mb-2">
      <img src={user.image ?? "/unknown-user.webp"} alt={`${user.name}'s profile photo`} className="rounded-full w-60 aspect-square mb-6" />
      <h1 className="text-white font-semibold text-xl">
        {user.name}
      </h1>
      <h2 className="text-neutral-300 font-light text-lg leading-none">
        @{user.username}
      </h2>
    </section>
    <EditProfile />
  </header>;
}