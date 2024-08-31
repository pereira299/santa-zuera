import Hero from "../components/organisms/sections/hero";
import Members from "../components/organisms/sections/members";
import LastEpisodes from "../components/organisms/sections/last-episodes";
import MembersMobile from "../components/organisms/sections/membersMobile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Members />
      <MembersMobile />
      <LastEpisodes />
    </main>
  );
}
