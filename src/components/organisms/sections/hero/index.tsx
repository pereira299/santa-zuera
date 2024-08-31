import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <Image
        src={"/santa-zuera.png"}
        alt="Santa Zuera"
        width={500}
        height={500}
      />
      <span className="flex flex-row items-center justify-center gap-x-2">
        <p className="text-xl">O podcast do</p>
        <Link href="https://santacarona.com" passHref>
          <Image
            src={"/santa-carona.png"}
            alt="Santa Carona logo"
            width={100}
            height={100}
          />
        </Link>
      </span>
      <ChevronDown size={48} className="animate-pulse text-white  absolute bottom-5"/>
    </section>
  );
};

export default Hero;
