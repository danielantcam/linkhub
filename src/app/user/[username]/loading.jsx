import Navbar from "components/Navbar";

export default function Fallback(){
  return <>
    <Navbar/>
    <div className="
      py-6 flex flex-col gap-8
      lg:py-10
      xl:gap-20
      lg:flex-row
    ">
      <div className="
        h-80 bg-neutral-800 rounded-lg animate-pulse
        lg:w-80
      ">
        {/* profile card */}
      </div>

      <div className="grow flex flex-col gap-4">
        <div className="bg-neutral-800 h-20 rounded-lg animate-pulse">
          {/* link */}
        </div>

        <div className="bg-neutral-800 h-20 rounded-lg animate-pulse">
          {/* link */}
        </div>

        <div className="bg-neutral-800 h-20 rounded-lg animate-pulse">
          {/* link */}
        </div>

        <div className="bg-neutral-800 h-20 rounded-lg animate-pulse">
          {/* link */}
        </div>
      </div>
    </div>
  </>;
}