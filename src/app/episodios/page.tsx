import Episode from "@/src/components/molecules/episode";
import Paginate from "@/src/components/molecules/pagination";
import Filter from "@/src/components/organisms/Filter";
import FilterMobile from "@/src/components/organisms/filter-mobile";
import { Category, Episode as EpisodeType, Person } from "@/types/global";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Episódios | Santa Zuera",
  description:
    "A Zuera Santifica! Confira os episódios do Santa Zuera, o Podcast do Santa Carona!",
  keywords: [
    "Santa Zuera",
    "Santa Carona",
    "Podcast",
    "Episódios",
    "Igreja",
    "Católico",
    "Cristão",
    "Religião",
    "Deus",
    "Jesus",
    "Espírito Santo",
  ],
  openGraph: {
    title: "Episódios | Santa Zuera",
    description:
      "A Zuera Santifica! Confira os episódios do Santa Zuera, o Podcast do Santa Carona!",
    images: [
      {
        url: `https://${process.env.BASE_URL}/logo.png`,
        width: 488,
        height: 488,
        alt: "Santa Zuera",
      },
    ],
    siteName: "Santa Zuera",
  },
};

const EpisodePage = async ({
  searchParams,
}: {
  searchParams: {
    "person[]"?: string;
    "category[]"?: string;
    startDate?: string;
    endDate?: string;
    title?: string;
    page?: number;
  };
}) => {
  const content: {
    categories: { items: Category[] };
    persons: { items: Person[] };
    episodes: { items: EpisodeType[]; total: number; page: number };
  } = await getContent(searchParams);

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

  return (
    <main className="min-h-screen px-4 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-bitter text-4xl font-bold mb-5 fixed z-30 top-[6.5rem]">
        Episódios
      </h1>
      <div className="bg-gradient-to-b from-black via-black via-70% lg:via-50% to-transparent w-screen h-52 lg:w-[75%] lg:h-40 lg:left-[28%] z-20 fixed top-0"></div>
      <FilterMobile
        persons={content.persons.items}
        categories={content.categories.items}
      />
      <div className="w-full flex flex-row">
        <span className="max-lg:hidden">
          <Filter
            persons={content.persons.items}
            categories={content.categories.items}
          />
        </span>
        {content.episodes.items.length === 0 && (
          <h2 className="text-2xl font-bold mt-12 w-full text-center lg:pl-[28%] text-zinc-600">
            Nenhum episódio encontrado
          </h2>
        )}
        {content.episodes.items.length > 0 && (
          <>
            <ul className="lg:pl-[28%] w-screen flex flex-row flex-wrap justify-between gap-x-4 gap-y-8 mb-10 pt-12">
              {content.episodes.items.map((episode) => (
                <li
                  key={episode.title}
                  className="w-full sm:w-[48%] lg:w-[32%]"
                >
                  <Episode
                    {...episode}
                    persons={episode.participantes}
                    className="w-full"
                  />
                </li>
              ))}
              <span className="flex items-center justify-center w-full">
                <Paginate
                  {...content.episodes}
                  baseUrl={process.env.BASE_URL || ""}
                />
              </span>
            </ul>
          </>
        )}
      </div>
    </main>
  );
};
export default EpisodePage;

async function getContent(params: {
  "person[]"?: string;
  "category[]"?: string;
  startDate?: string;
  endDate?: string;
  title?: string;
  page?: number;
}): Promise<{
  categories: { items: Category[] };
  persons: { items: Person[] };
  episodes: { items: EpisodeType[]; total: number; page: number };
}> {
  const categories = await fetch(`${process.env.BASE_URL}/api/categories`);
  const persons = await fetch(`${process.env.BASE_URL}/api/persons`);
  const query = Object.entries(params);
  query.push(["qtd", "21"]);
  const episodes = await fetch(
    `${process.env.BASE_URL}/api/episodes/search?${query
      .map((p) => p.join("="))
      .join("&")}`
  );
  return {
    categories: await categories.json(),
    persons: await persons.json(),
    episodes: await episodes.json(),
  };
}
