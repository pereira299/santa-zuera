import Avatar from "@/src/components/atoms/avatar";

const MembersMobile = () => {
  return (
    <section id="membros" className="flex flex-row flex-wrap justify-between py-20 lg:hidden w-full min-h-screen text-2xl">
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <Avatar name="Guilherme Cadoiss" noTooltip size="2xl" image="https://shorturl.at/BZTYf"/>
        <p>Guiherme Cadoiss</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar name="Hian Gustavo" noTooltip size="2xl" image="https://tinyurl.com/5a3696jk"/>
        <p>Hian Gustavo</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar name="Max Pfütz" noTooltip size="2xl" image="https://shorturl.at/nA9Gf"/>
        <p>Max Pfütz</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar name="Tobias Goulão" noTooltip size="2xl" image="https://tinyurl.com/2rur7f6d"/>
        <p>Tobias Goulão</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar name="Carlos Neiva" noTooltip size="2xl" image="https://shorturl.at/8L7ps"/>
        <p>Carlos Neiva</p>
      </div>
    </section>
  );
};

export default MembersMobile;
