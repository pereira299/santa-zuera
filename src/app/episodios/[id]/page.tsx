import Avatar from "@/src/components/atoms/avatar";
import Chip from "@/src/components/atoms/chip";
import ReadMore from "@/src/components/atoms/read-more";
import { Button } from "@/src/components/ui/button";
import { Category, Person } from "@/types/global";
import { Calendar, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Episode = {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  thumbnail: string;
  categories: Category[];
  participantes: Person[];
  countNumber: number;
  youtubeLink: string;
  spotifyLink: string;
};

const Page = async ({ params }: { params: { id: number } }) => {
  const episode = await getEpisode(params.id);
  console.log(episode);
  return (
    <main className="w-screen min-h-screen pt-28 pb-10 px-10 flex flex-row gap-x-5">
      <Image
        src={episode.thumbnail}
        alt={episode.title}
        width={400}
        height={400}
        className="rounded-2xl w-[50vw] h-[70vh] object-cover fixed top-[18vh] left-5"
      />
      <div className="bg-gradient-to-b from-black via-black to-transparent w-[75%] h-40 left-[28%] z-20 fixed top-0"></div>
      <section className="w-5/12 px-4 ml-[50vw]">
        <small className="text-xl text-zinc-600 font-bold">
          #{episode.countNumber}
        </small>
        <h1 className="text-4xl font-bold mb-2">{episode.title}</h1>
        <ul className="flex flex-row gap-x-2 mb-5">
          {episode.categories.map((category) => (
            <li key={category.id}>
              <Chip label={category.name} variant="outlined" />
            </li>
          ))}
        </ul>
        <ReadMore text={episode.description} />
        <div className="flex flex-row items-center justify-start gap-3 text-zinc-500 mb-8">
          <CalendarDays size={24} />
          <p className="text-md font-medium">
            {Intl.DateTimeFormat("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(episode.publishDate))}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-5 mb-5">
          {episode.spotifyLink && (
            <Link
              target="_blank"
              href={episode.spotifyLink}
              className="flex flex-row gap-2 px-2 rounded-lg items-center text-md text-white bg-green-600 hover:bg-green-700 h-12"
            >
              <Image src="/spotify.svg" alt="Spotify" width={30} height={30} />
              <p className="text-xl font-bold">Spotify</p>
            </Link>
          )}
          {!!episode.youtubeLink && (
            <Link
              target="_blank"
              href={episode.youtubeLink}
              className="flex flex-row gap-2 px-2 rounded-lg items-center text-md text-white bg-red-600 hover:bg-red-700 h-12"
            >
              <Image src="/youtube.svg" alt="Youtube" width={45} height={30} />
              <p className="text-xl font-bold">Youtube</p>
            </Link>
          )}
        </div>
        <article className="flex flex-row flex-wrap items-center justify-between p-5 bg-zinc-600/30 rounded-xl">
          <h4 className="w-full mb-3 font-bold text-lg">Com a presença de</h4>
          <ul className="flex flex-row w-full flex-wrap gap-y-4 gap-x-6">
            {episode.participantes.map((person) => (
              <li key={person.id}>
                <Link
                  href={person.instagramUrl || "#"}
                  className="flex flex-row items-center gap-2"
                >
                  <Avatar name={person.name} image={person.photoUrl} />
                  <p className="text-md text-zinc-300">{person.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
};

export async function getEpisode(id: number): Promise<Episode> {
  const res = await fetch(`${process.env.BASE_URL}/api/episodes/${id}`);
  const episode = await res.json();
  return episode;
}

export default Page;
