import Hero from "../components/organisms/sections/hero";
import Members from "../components/organisms/sections/members";
import LastEpisodes from "../components/organisms/sections/last-episodes";
import MembersMobile from "../components/organisms/sections/membersMobile";
import { Episode } from "@/types/global";

export default async function Home() {
  const episodes = await getLastEpisodes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Members />
      <MembersMobile />
      <LastEpisodes episodes={episodes}/>
    </main>
  );
}

export const getLastEpisodes = async (): Promise<Episode[]> => {
  const res = await fetch(process.env.BASE_URL + "/api/episodes/list?qtd=3");
  const data = await res.json();
  return data;
}