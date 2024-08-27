import Gemini from "@/services/gemini";
import { SpotifyEpisode } from "@/types/spotify";

export const getParticipants = async (
  data: SpotifyEpisode,
  gemini: Gemini
): Promise<string[]> => {
  const res: { participantes: string[] } = await gemini.promptJson([
    "Encontre e liste os participantes do podcast na descrição do episódio. Retorne no formato { participantes: [] }",
    data.description,
  ]);
  return res.participantes;
};

export const getCategories = async (
  data: SpotifyEpisode,
  title: string,
  categories: string[],
  gemini: Gemini
): Promise<string[]> => {
  const res: { categories: string[] } = await gemini.promptJson([
    "Cada categoria deve ter no máximo 3 palavras.",
    "Não utilize os termos, podcast, episódio e o título do episódio.",
    `De preferencia para as categorias "${categories.join(", ")}"`,
    `Analise descrição do episódio e liste as 5 categorias mais relevantes com o tema "${title}". Retorne no formato { categories: [] }`,
    data.description,
  ]);
  const remove = ["podcast", "episodio", title.toLowerCase()];

  console.log(res.categories);
  return res.categories.filter(
    (c) => !remove.some((r) => c.toLowerCase().includes(r))
  );
};

export const getId = (data: SpotifyEpisode): number => {
  const name = data.name.split("-");
  const id =
    name.find((n) => n.includes("#"))?.replace(/[^#\d{1,8}]/g, "") || "";
  return Number(id.substring(1));
};

export const getTitle = (data: SpotifyEpisode): string => {
  const name = data.name.split("-");
  return name.find((n) => !n.includes("#"))?.trim() || "";
};
