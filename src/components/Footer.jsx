import Link from "next/link";

export default function Footer(){
  return <footer className="
    text-white min-h-30 py-10 grid grid-cols-1 gap-6 text-sm
    md:grid-cols-2 md:gap-20 md:text-base md:py-20
  ">
    <div className="h-full flex items-center">
      <p>This website is a demo that is NOT intended to have real users. However you can read our <Link href="/privacy-policy" className="text-blue-500 hover:underline">privacy policy</Link>.</p>
    </div>
    <div className="
      h-full flex flex-col justify-center
      md:items-center
    ">
      <div className="flex flex-col">
        <span>&copy; Daniel Antón Camarero - <a href="https://danielantcam.dev/" className="text-blue-500 hover:underline">danielantcam.dev</a></span>
        <a href="https://linkshortener.danielantcam.dev/" className="text-blue-500 hover:underline">Visit my URL shortener</a>
      </div>
    </div>
  </footer>;
}