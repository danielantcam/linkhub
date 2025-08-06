import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Link from 'next/link';

export default function Home() {
  return (<>
    <Navbar />
    <header className='
      flex flex-col items-center mt-10
      lg:h-180 lg:gap-40 lg:flex-row lg:mt-0
      xl:gap-60
      2xl:gap-70
    '>
      <div>
        <h1 className='
          text-white text-5xl font-semibold mb-4
          lg:text-6xl
        '>Display all your links in a single place</h1>
        <h2 className='
          text-neutral-200 text-xl font-semibold mb-6
          lg:text-2xl
        '>LinkHUB lets you easily share your URL's with your social media followers, customers, etc.</h2>
        <Link href="/login" className="inline-block px-6 py-3 bg-neutral-200 font-bold text-xl text-neutral-800 rounded-md cursor-pointer hover:bg-neutral-900 border-2 border-white hover:border-neutral-700 hover:text-white transition-colors">
          Start for free
        </Link>
      </div>
      <img src="/quevedo-profile-portrait.webp" alt="A phone displaying a LinkHUB profile" className='
        w-full mt-10
        md:py-20 md:w-auto md:h-full
      '/>
    </header>
    <Footer></Footer>
  </>);
}
