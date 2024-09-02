"use client";
import { useState } from "react";
import { Button } from "../../ui/button";

const ReadMore = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={`${show ? "" : "max-h-60"} overflow-hidden`}>
        <p className="text-zinc-300">{text}</p>
      </div>
      <Button onClick={() => setShow(!show)} className="font-bold p-2 mb-2 text-md" variant="ghost">
        {show ? "Mostrar menos" : "Leia mais"}
      </Button>
    </>
  );
};

export default ReadMore;
