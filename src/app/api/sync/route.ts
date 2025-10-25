import { NextRequest, NextResponse } from "next/server";
import contentful from "@/services/contentful";
import Spotify from "@/services/spotify";
import GoogleYoutube from "@/services/youtube";
import { Episode } from "@/types/global";
import Gemini from "@/services/gemini";
import {  Video, YoutubeSearch } from "@/types/youtube";
import { getCategories, getId, getParticipants, getTitle } from "@/utils/spotify";
import * as youtube from "@/utils/youtube";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  // get last stored episode
  const lastStoredEpisode = await getEpisodes();
  // get episodes from spotify
  const spotifyEpisodes = await getSpotifyEpisodes();

  const lastStoredEpisodeId = Number(lastStoredEpisode[1].fields.countNumber);
  const hasNewEpisode = spotifyEpisodes.items.find((item) => getId(item) === lastStoredEpisodeId+1);
  // check if there are new episodes
  // const lastStoredEpisodeDate = new Date(
  //   lastStoredEpisode[0].fields.publishDate as string
  // ).getTime();
  // const lastSpotifyEpisodeDate = new Date(
  //   spotifyEpisodes.items[0].release_date
  // ).getTime();
  // if (lastStoredEpisodeDate >= lastSpotifyEpisodeDate) {
  //  return NextResponse.json({
  //     message: "No new episodes",
  //   });
  // }
  if (!hasNewEpisode){
    return NextResponse.json({
      message: "No new episodes",
      lastEpisode: {
        ...lastStoredEpisode[1].fields
      }
    })
  }
  
  const name = getTitle(hasNewEpisode);
  const id = getId(hasNewEpisode);
  const thumbnail = hasNewEpisode.images.sort(
    (a, b) => b.width - a.width
  )[0].url;
  const data: Episode = {
    title: name,
    id: id,
    countNumber: id,
    publishDate: hasNewEpisode.release_date,
    links: {
      spotify: hasNewEpisode.external_urls.spotify,
      youtube: "",
    },
    thumbnail: thumbnail,
    description: hasNewEpisode.description,
    duration: hasNewEpisode.duration_ms,
    categories: [],
    participantes: [],
  };
  // generate categories and participantes
  const allCategories = await contentful.getEntries({
    content_type: "category",
    select: ["fields.name"],
  });
  const categoryList = allCategories.items.map((c) => c.fields.name as string);

  const gemini = new Gemini();
  const [participants, categories] = await Promise.all([
    getParticipants(hasNewEpisode, gemini),
    getCategories(hasNewEpisode, name, [ ...categoryList], gemini),
  ]);

  categories.push("Fé");
  data.categories = categories.map((c) => ({ name: c, id: "" }));
  data.participantes = participants.map((p) => ({ name: p.replace("Max", "Maximiliano").replace("Pfutz", "Pfütz"), id: "", photoUrl: "", instagramUrl: "" }));

  // get new episodes from youtube
  const youtubeEpisodes = await getYouTubeEpisodes(name, id);
  youtubeEpisodes.items.find((item) => {
    const id = youtube.getId(item);
    if (id === data.id) {
      data.links.youtube = `https://www.youtube.com/watch?v=${item.id.videoId}`;
      return true;
    }
  });

  // store new episodes
  const cat = (await contentful.getEntries({ content_type: "category" })).items
    .map((c) => ({
      name: c.fields.name as string,
      id: c.sys.id,
    }))
    .filter((c) => {
      return data.categories.find(cc => cc.name === c.name);
    });
  const persons = (
    await contentful.getEntries({ content_type: "person" })
  ).items
    .map((p) => ({
      name: p.fields.name as string,
      id: p.sys.id,
    }))
    .filter((p) => {
      return data.participantes.find(pp => pp.name == p.name);
    });

  const defaultPersons = [
    { name: "Guilherme Cadoiss", id: "4LwEhSlec4KRIJ0IGsc77z" },
    { name: "Carlos Neiva", id: "7KuNHEJg9ri1FNuP83qiQk" },
  ]

  const personsFinal = persons.length > 0 ? persons : defaultPersons;
  const entry = await contentful.createEntry("episode", {
    countNumber: { "en-US": data.id },
    title: { "en-US": data.title },
    description: {
      "en-US": {
        nodeType: "document",
        content: [
          {
            nodeType: "paragraph",
            content: [
              {
                nodeType: "text",
                value: data.description,
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
        ],
        data: {},
      },
    },
    publishDate: { "en-US": data.publishDate },
    durationMs: { "en-US": data.duration },
    spotifyLink: { "en-US": data.links.spotify },
    youtubeLink: { "en-US": data.links.youtube },
    thumbnail: { "en-US": data.thumbnail },
    categories: {
      "en-US": cat.map((c) => ({
        sys: { type: "Link", linkType: "Entry", id: c.id },
      })),
    },
    participantes: {
      "en-US": personsFinal.map((p) => ({
        sys: { type: "Link", linkType: "Entry", id: p.id },
      })),
    },
  });

  return NextResponse.json({
    message: "New episodes stored",
    data: {
      name: entry.fields.title["en-US"],
      id: entry.sys.id,
      description: entry.fields.description["en-US"],
      publishDate: entry.fields.publishDate["en-US"],
      duration: entry.fields.durationMs["en-US"],
      spotifyLink: entry.fields.spotifyLink["en-US"],
      youtubeLink: entry.fields.youtubeLink["en-US"],
      thumbnail: entry.fields.thumbnail["en-US"],
      number: entry.fields.countNumber["en-US"],
    },
  });
}

const getEpisodes = async () => {
  const res = await contentful.getEntries({
    content_type: "episode",
    select: ["fields.title", "fields.countNumber", "fields.publishDate"],
    order: ["-fields.countNumber"],
  });

  return res.items;
};

const getSpotifyEpisodes = async () => {
  const spotify = new Spotify();
  const episodes = await spotify.getEpisodeList();
  return episodes;
};

interface YoutubeEpisodes extends YoutubeSearch {
  items: Video[];
}
const getYouTubeEpisodes = async (name: string, id: number) => {
  const youtube = new GoogleYoutube();
  const episodes = await youtube.search(`${name} | Santa Zuera #${id}`, [
    "video",
  ]);
  return episodes as YoutubeEpisodes;
};
