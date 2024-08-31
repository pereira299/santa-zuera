import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

const Header = () => {
  return (
    <header className="flex flex-row left-[9%] mt-4 p-3 z-50 rounded-xl backdrop-blur-lg fixed w-10/12 bg-zinc-700/50 justify-between items-center">
      <Button variant={"ghost"} className="md:hidden">
        <Menu className="w-7 h-fit"/>
      </Button>
      <Link href="/" className="hover:brightness-75 w-4/12 xs:w-3/12 sm:w-2/12 md:w-[10%]">
        <Image
          src="/santa-zuera.png"
          alt="Santa Zuera"
          width={300}
          height={300}
          className="w-full"
        />
      </Link>
      <nav className="text-white w-fit h-fit mr-5 max-md:hidden">
        <ul className="flex flex-row gap-x-10 text-lg 3xl:text-3xl">
          <li className="hover:text-zinc-300">
            <Link href="#membros" className="underline-link">Integrantes</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Link href="#episodes" className="underline-link">Últimos episódios</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Link href="#">
              <Search className="w-6 3xl:w-9 h-fit"/>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="md:hidden w-10"></div>
    </header>
  );
};

export default Header;
