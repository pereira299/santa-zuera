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
        className="w-7/12 sm:w-6/12 md:w-4/12 h-fit"
      />
      <span className="flex flex-row items-center justify-center gap-x-2 w-8/12 md:w-4/12">
        <p className="text-xl 3xl:text-4xl">O podcast do</p>
        <Link
          href="https://santacarona.com"
          passHref
          className="w-4/12 sm:w-3/12 md:w-4/12 lg:w-3/12"
        >
          <Image
            src={"/santa-carona.png"}
            alt="Santa Carona logo"
            width={100}
            height={100}
            className="w-full h-fit"
          />
        </Link>
      </span>
      <Link href="#membros" aria-label="membros" passHref>
        <ChevronDown className="animate-pulse text-white left-[45%] absolute bottom-5 h-fit w-12 2xl:w-20 3xl:w-24" />
      </Link>
    </section>
  );
};

export default Hero;
