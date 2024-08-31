import Episode from "@/src/components/molecules/episode";
import { Button } from "@/src/components/ui/button";

const LastEpisodes = () => {
  const episodes = [
    {
      title: "Episódio 1",
      date: "2021-08-01",
      thumbnail: "/sz-ep1.png",
      categories: [
        { name: "Humor", id: "1" },
        { name: "Entrevista", id: "2" },
      ],
      persons: [
        {
          name: "Hian",
          photoUrl: "/hian.png",
          id: "1",
        },
        {
          name: "Gustavo",
          photoUrl: "/gustavo.png",
          id: "2",
        },
      ],
    },
    {
      title: "Episódio 2",
      date: "2021-08-08",
      thumbnail: "/sz-ep2.png",
      categories: [
        { name: "Humor", id: "1" },
        { name: "Entrevista", id: "2" },
      ],
      persons: [
        {
          name: "Hian",
          photoUrl: "/hian.png",
          id: "1",
        },
        {
          name: "Gustavo",
          photoUrl: "/gustavo.png",
          id: "2",
        },
      ],
    },
    {
      title: "Episódio 3",
      date: "2021-08-15",
      thumbnail: "/sz-ep3.png",
      categories: [
        { name: "Humor", id: "1" },
        { name: "Entrevista", id: "2" },
      ],
      persons: [
        {
          name: "Hian",
          photoUrl: "/hian.png",
          id: "1",
        },
        {
          name: "Gustavo",
          photoUrl: "/gustavo.png",
          id: "2",
        },
      ],
    },
  ];

  return (
    <section
      id="episodes"
      className="w-full min-h-screen px-10 pt-10 flex flex-col gap-y-10 justify-center items-center"
    >
      <h3 className="font-bitter text-4xl font-bold">Últimos episódios</h3>
      <ul className="flex flex-col md:flex-row gap-10 w-full justify-center">
        {episodes.map((episode) => (
            <li key={episode.title} className="w-full md:w-4/12">
                <Episode {...episode} />
            </li>
        ))}
      </ul>
      <Button
        className="w-full md:w-4/12 mb-10 font-bold"
      >
        Ver todos os episódios
      </Button>
    </section>
  );
};

export default LastEpisodes;
