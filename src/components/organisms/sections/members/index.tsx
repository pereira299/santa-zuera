import { gloria } from "@/src/app/layout";
import { ArrowUp, CornerUpLeft, CornerUpRight, MoveUp } from "lucide-react";
import Image from "next/image";

const Members = () => {
  return (
    <section
      id="membros"
      className="max-lg:hidden w-full min-h-screen flex justify-center items-center"
    >
      <Image
        src={"/sz-membros.png"}
        alt="Integrantes"
        width={1920}
        height={1080}
        className="w-10/12 h-fit"
      />

      <span className={`${gloria.className} text-white `}>
        <span className="absolute left-5 flex flex-col justify-center items-center">
          <CornerUpRight size={50} strokeWidth={1.25} className="ml-8" />
          <p className="text-center">
            Hian
            <br />
            Gustavo
          </p>
        </span>
        <span className="absolute left-1/4 -mt-36 flex flex-col justify-center items-center">
          <CornerUpRight size={50} strokeWidth={1.25} />
          <p>
            Guilherme
            <br />
            Cadoiss
          </p>
        </span>
        <span className="absolute left-1/2 mt-52 flex flex-col justify-center items-center">
          <MoveUp size={50} strokeWidth={1.25} />
          <p>Max Pfutz</p>
        </span>
        <span className="absolute right-[35%] -mt-24 flex flex-col justify-center items-center">
          <CornerUpRight size={50} strokeWidth={1.25} className="ml-8"/>
          <p>
            Carlos
            <br />
            Neiva
          </p>
        </span>
        <span className="absolute flex flex-col justify-center items-center">
          <CornerUpLeft size={50} strokeWidth={1.25} className="mr-8" />
          <p>Tobias<br />Goulão</p>
        </span>
      </span>
    </section>
  );
};

export default Members;
