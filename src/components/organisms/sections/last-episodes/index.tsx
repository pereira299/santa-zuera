import Episode from "@/src/components/molecules/episode";
import { Button } from "@/src/components/ui/button";
import { Episode as EpisodeType } from "@/types/global";
import Link from "next/link";

type EpisodeProps = {
  episodes: Array<EpisodeType>;
};

const LastEpisodes = ({episodes}: EpisodeProps) => {

  return (
    <section
      id="episodes"
      className="w-full min-h-screen px-10 pt-10 flex flex-col gap-y-10 justify-center items-center"
    >
      <h3 className="font-bitter text-4xl font-bold">Últimos episódios</h3>
      <ul className="flex flex-col md:flex-row gap-10 w-full justify-center">
        {episodes.map((episode) => (
            <li key={episode.title} className="w-full md:w-4/12">
                <Episode {...episode} persons={episode.participantes} countNumber={episode.countNumber} />
            </li>
        ))}
      </ul>
      <Link href="/episodios"
        className="w-full md:w-4/12 mb-10 font-bold bg-white hover:bg-zinc-200 transition-colors text-black p-2 rounded-lg text-center"   
      >
        Ver todos os episódios
      </Link>
    </section>
  );
};

export default LastEpisodes;
