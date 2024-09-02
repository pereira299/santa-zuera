import Image from "next/image";
import Link from "next/link";
import MenuMobile from "../menu-mobile";
import Search from "../../organisms/search";

const Header = () => {
  return (
    <header className="flex flex-row left-[9%] mt-4 p-3 z-50 rounded-xl backdrop-blur-lg fixed w-10/12 bg-zinc-700/50 justify-between items-center">
      <MenuMobile />
      <Link href="/" aria-label="santa-zuera" className="hover:brightness-75 w-4/12 xs:w-3/12 sm:w-2/12 md:w-[10%]">
        <Image
          src="/santa-zuera.png"
          alt="Santa Zuera"
          width={300}
          height={300}
          className="w-full"
        />
      </Link>
      <nav className="text-white w-fit h-fit mr-5 max-md:hidden">
        <ul className="flex flex-row gap-x-10 text-lg 3xl:text-3xl items-center">
          <li className="hover:text-zinc-300">
            <Link href="/#membros" aria-label="membros" className="underline-link">Integrantes</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Link href="/#episodes" aria-label="episódios" className="underline-link">Últimos episódios</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Search />
          </li>
        </ul>
      </nav>
      <div className="md:hidden w-10"></div>
    </header>
  );
};

export default Header;
