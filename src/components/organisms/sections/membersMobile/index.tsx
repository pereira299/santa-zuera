import Avatar from "@/src/components/atoms/avatar";

const MembersMobile = () => {
  return (
    <section
      id="membros"
      className="flex flex-row flex-wrap justify-between py-20 lg:hidden w-full min-h-screen text-2xl"
    >
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <Avatar
          name="Guilherme Cadoiss"
          noTooltip
          size="2xl"
          image="https://images.ctfassets.net/voob0fi3aunm/77HUyjE5MBDKO5NcNgmlcD/2e6b1ad3960215114521f9ccfa64ea74/425151873_24735834212698301_2773462865623608604_n.jpg"
        />
        <p>Guiherme Cadoiss</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar
          name="Hian Gustavo"
          noTooltip
          size="2xl"
          image="https://images.ctfassets.net/voob0fi3aunm/35KdSSvsqpncOitObVdM0D/4669102f377bf95b5fae43864670bb9f/424505552_371775758786842_4319366649284004695_n.jpg"
        />
        <p>Hian Gustavo</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar
          name="Max Pfütz"
          noTooltip
          size="2xl"
          image="https://images.ctfassets.net/voob0fi3aunm/shIeCgSDx1RZpiWUjQQfs/156cefbac45af8d2bf6190c7bc71f2fc/450378197_825565679546062_5724597788119238189_n.jpg"
        />
        <p>Max Pfütz</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar
          name="Tobias Goulão"
          noTooltip
          size="2xl"
          image="https://images.ctfassets.net/voob0fi3aunm/2uhLtmrzlbYAah8bKHNGh2/bf823bcda628f3d318622635cc520ad4/434621921_3642433146023830_7516563682587543952_n.jpg"
        />
        <p>Tobias Goulão</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-6/12">
        <Avatar
          name="Carlos Neiva"
          noTooltip
          size="2xl"
          image="https://images.ctfassets.net/voob0fi3aunm/7s8hHSp9Rd0BkMEK957nrT/a2b292bc48b86b74ba640a6d16ee31c3/445908017_819259450087358_8644088444152897137_n.jpg"
        />
        <p>Carlos Neiva</p>
      </div>
    </section>
  );
};

export default MembersMobile;
