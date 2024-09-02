import Episode from "@/src/components/molecules/episode";
import Paginate from "@/src/components/molecules/pagination";
import Filter from "@/src/components/organisms/Filter";
import { Category, Episode as EpisodeType, Person } from "@/types/global";

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
  console.log(content.episodes.items);
  
  return (
    <main className="min-h-screen px-4 pt-32">
      <h1 className="font-bitter text-4xl font-bold mb-5 fixed top-[6.5rem]">
        Episódios
      </h1>
      <div className="bg-gradient-to-b from-black via-black to-transparent w-[75%] h-40 left-[28%] z-20 fixed top-0"></div>
      <div className="w-full flex flex-row">
        <Filter
          persons={content.persons.items}
          categories={content.categories.items}
        />
        {content.episodes.items.length === 0 && (
          <h2 className="text-2xl font-bold mt-12 w-full text-center pl-[28%] text-zinc-600">
            Nenhum episódio encontrado
          </h2>
        )}
        {content.episodes.items.length > 0 && (
          <>
            <ul className="pl-[28%] w-screen flex flex-row flex-wrap gap-x-4 gap-y-8 mb-10 pt-12">
              {content.episodes.items.map((episode) => (
                <li key={episode.title} className="w-[32%]">
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

export async function getContent(params: {
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
