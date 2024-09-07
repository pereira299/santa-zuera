import Avatar from "@/src/components/atoms/avatar";
import Chip from "@/src/components/atoms/chip";
import ReadMore from "@/src/components/atoms/read-more";
import { Button } from "@/src/components/ui/button";
import { Category, Person } from "@/types/global";
import { Calendar, CalendarDays } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type Props = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params }: Props) => {
  if (!params.id) return notFound();
  const episode = await getEpisode(params.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
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

  return (
    <main className="w-screen min-h-screen pt-28 pb-10 px-7 lg:px-10 flex flex-col lg:flex-row gap-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Image
        src={episode.thumbnail}
        alt={episode.title}
        width={400}
        height={400}
        className="rounded-2xl w-full lg:w-[50vw] h-fit lg:h-[70vh] lg:object-cover lg:fixed lg:top-[18vh] lg:left-5"
      />
      <div className="bg-gradient-to-b from-black via-black to-transparent w-full lg:w-[75%] h-40 lg:left-[28%] z-20 fixed top-0"></div>
      <section className="w-full lg:w-5/12 lg:px-4 lg:ml-[50vw]">
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
        <div className="flex flex-row items-center justify-between lg:justify-start gap-5 mb-5">
          {episode.spotifyLink && (
            <Link
              target="_blank"
              href={episode.spotifyLink}
              className="flex flex-row gap-2 px-2 max-lg:w-[48%] rounded-lg items-center justify-evenly text-md text-white bg-green-600 hover:bg-green-700 h-12"
            >
              <Image src="/spotify.svg" alt="Spotify" width={30} height={30} />
              <p className="text-xl font-bold">Spotify</p>
            </Link>
          )}
          {!!episode.youtubeLink && (
            <Link
              target="_blank"
              href={episode.youtubeLink}
              className="flex flex-row gap-2 px-2 rounded-lg max-lg:w-[48%] items-center text-md text-white bg-red-600 hover:bg-red-700 h-12"
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

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product: Episode = await await fetch(
    `${process.env.BASE_URL}/api/episodes/${id}`
  ).then((res) => res.json());

  return {
    title: `Santa Zuera #${id} | ${product.title}`,
    description: `Confira o episódio ${id} - ${product.title} do Santa Zuera, o Podcast do Santa Carona!`,
    keywords: [
      "Santa Zuera",
      "Santa Carona",
      "Podcast",
      "Episódio",
      "Igreja",
      "Católico",
      "Cristão",
      "Religião",
      "Deus",
      "Jesus",
      "Espírito Santo",
      ...product.categories.map((category) => category.name),
    ],
    openGraph: {
      title: `Santa Zuera #${id} | ${product.title}`,
      description: `Confira o episódio ${id} - ${product.title} do Santa Zuera, o Podcast do Santa Carona!`,
      images: [
        {
          url: product.thumbnail,
          width: 400,
          height: 400,
          alt: product.title,
        }
      ],
      siteName: "Santa Zuera",
    }
  };
}

async function getEpisode(id: number): Promise<Episode> {
  const res = await fetch(`${process.env.BASE_URL}/api/episodes/${id}`);
  if (!res.ok) return notFound();
  const episode = await res.json();
  return episode;
}

export default Page;
