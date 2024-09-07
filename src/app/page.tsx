import Hero from "../components/organisms/sections/hero";
import Members from "../components/organisms/sections/members";
import LastEpisodes from "../components/organisms/sections/last-episodes";
import MembersMobile from "../components/organisms/sections/membersMobile";
import { Episode } from "@/types/global";
import { gloria } from "./layout";

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Santa Zuera",
    url: `https://${process.env.BASE_URL}`,
    image: `https://${process.env.BASE_URL}/logo.png`,
    description: "A Zuera Santifica! Santa Zuera, o Podcast do Santa Carona!",
    sameAs: [
      "https://www.facebook.com/santacarona",
      "https://www.instagram.com/santacarona",
      "https://www.youtube.com/santacarona",
    ],
  };

  const episodes = await getLastEpisodes();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Members />
        <MembersMobile />
        <LastEpisodes episodes={episodes} />
        <p
          className={`text-3xl ${gloria.className} font-bold mb-10 text-center`}
        >
          Nossa Senhora Acumulada De Todas as Graças, rogai por nós!
        </p>
      </main>
    </>
  );
}

const getLastEpisodes = async (): Promise<Episode[]> => {
  const res = await fetch(process.env.BASE_URL + "/api/episodes/list?qtd=3");
  const data = await res.json();
  return data;
};
