import EditProfile from "./EditProfile";

export default function ProfileCard({ user }){
  return <header className="
    bg-neutral-900 border-2 border-neutral-800 p-8 rounded-xl h-fit w-full
    md:w-fit
    xl:p-10
  ">
    <section aria-labelledby="profile-heading" className="
      flex flex-col items-center gap-4
      xs:flex-row xs:gap-8
      md:gap-16 md:justify-center
      lg:flex-col lg:gap-6 lg:items-center
    ">
      <div className="
        rounded-full w-60 aspect-square overflow-hidden
        xs:w-2/5
        md:w-60
        3xl:w-70
      ">
        <img src={user?.image ?? "/unknown-user.webp"} alt={`${user?.name ?? "User"}'s profile photo`} className="
          object-cover w-full h-full
        "/>
      </div>
      <div className="
        min-w-full
        sm:w-fit
      ">
        <h1 className="
          text-white font-semibold text-lg
          xs:text-xl
          md:text-2xl
          lg:text-xl
        ">
          {user.name}
        </h1>
        <h2 className="
          text-neutral-300 font-light leading-none
          xs:text-lg
          md:text-xl
          lg:text-lg
        ">
          @{user.username}
        </h2>
        <EditProfile />
      </div>
    </section>
  </header>;
}