import Spotify from "@/services/spotify";
import {
  getCategories,
  getTitle,
  getId,
  getParticipants,
} from "@/utils/spotify";
import { Episode, List } from "@/types/global";
import { NextRequest } from "next/server";
import Gemini from "@/services/gemini";

export async function GET(req: NextRequest) {
  const spotify = new Spotify();
  const search = req.nextUrl.searchParams;
  const page = search.get("page") || 1;
  const qtd = search.get("qtd") || 20;

  const data = await spotify.getEpisodeList(+page, +qtd);
  const result: List<Episode> = {
    items: [],
    meta: data.meta,
  };

  const gemini = new Gemini();
  console.log(data);
  for (const item of data.items) {
    const id = getId(item);
    const title = getTitle(item);
    const [participants, categories] = await Promise.all([
      getParticipants(item, gemini),
      getCategories(item, title, [], gemini),
    ]);
    result.items.push({
      id,
      thumbnail: item.images[0].url,
      title,
      description: item.description,
      duration: item.duration_ms,
      links: {
        spotify: item.external_urls.spotify, 
        youtube: "",
      },
      date: new Date(item.release_date),
      participants: participants,
      categories: categories,
    });
  }
}
