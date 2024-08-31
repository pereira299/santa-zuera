import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-row left-[9%] mt-4 p-3 rounded-xl backdrop-blur-lg fixed w-10/12 bg-zinc-700/50 justify-between items-center">
      <Link href="/" className="hover:brightness-75">
        <Image
          src="/santa-zuera.png"
          alt="Santa Zuera"
          width={100}
          height={100}
        />
      </Link>
      <nav className="text-white w-fit h-fit mr-5">
        <ul className="flex flex-row gap-x-10 text-lg">
          <li className="hover:text-zinc-300">
            <Link href="#membros" className="underline-link">Integrantes</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Link href="#episodes" className="underline-link">Últimos episódios</Link>
          </li>
          <li className="hover:text-zinc-300">
            <Link href="#">
              <Search size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
