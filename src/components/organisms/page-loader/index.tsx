"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

const PageLoader = () => {
  const [load, setLoad] = useState(true);
  useLayoutEffect(() => {
    setLoad(false);
  }, []);
  if (!load) return <> </>;

  return (
    <div
      id="page-loader"
      className="w-screen h-screen bg-black fixed top-0 left-0 z-[9999] flex flex-col gap-5 justify-center items-center"
    >
      <Image
        src="/santa-zuera.png"
        width={500}
        height={500}
        alt="logo santa zuera"
        className="w-10/12 sm:w-7/12 lg:w-4/12"
      />
      <Loader2
        size={50}
        className="text-zinc-400 animate-spin w-10 sm:w-16 2xl:w-28 h-fit"
        strokeWidth={1}
      />
    </div>
  );
};

export default PageLoader;
