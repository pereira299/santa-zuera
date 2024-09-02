import { NextRequest, NextResponse } from "next/server";
import contentful from "@/services/contentful";
import Spotify from "@/services/spotify";
import GoogleYoutube from "@/services/youtube";
import { Episode } from "@/types/global";
import Gemini from "@/services/gemini";
import {  Video, YoutubeSearch } from "@/types/youtube";
import { getCategories, getId, getParticipants, getTitle } from "@/utils/spotify";
import * as youtube from "@/utils/youtube";

export async function GET(req: NextRequest) {
  // get last stored episode
  const lastStoredEpisode = await getEpisodes();
  // get episodes from spotify
  const spotifyEpisodes = await getSpotifyEpisodes();

  // check if there are new episodes
  const lastStoredEpisodeDate = new Date(
    lastStoredEpisode[0].fields.publishDate as string
  ).getTime();
  const lastSpotifyEpisodeDate = new Date(
    spotifyEpisodes.items[0].release_date
  ).getTime();
  if (lastStoredEpisodeDate >= lastSpotifyEpisodeDate) {
    return NextResponse.json({
      message: "No new episodes",
    });
  }

  const name = getTitle(spotifyEpisodes.items[0]);
  const id = getId(spotifyEpisodes.items[0]);
  const thumbnail = spotifyEpisodes.items[0].images.sort(
    (a, b) => b.width - a.width
  )[0].url;
  const data: Episode = {
    title: name,
    id: id,
    countNumber: id,
    publishDate: spotifyEpisodes.items[0].release_date,
    links: {
      spotify: spotifyEpisodes.items[0].external_urls.spotify,
      youtube: "",
    },
    thumbnail: thumbnail,
    description: spotifyEpisodes.items[0].description,
    duration: spotifyEpisodes.items[0].duration_ms,
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
    getParticipants(spotifyEpisodes.items[0], gemini),
    getCategories(spotifyEpisodes.items[0], name, categoryList, gemini),
  ]);

  data.categories = categories.map((c) => ({ name: c, id: "" }));
  data.participantes = participants.map((p) => ({ name: p, id: "", photoUrl: "", instagramUrl: "" }));
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
      "en-US": persons.map((p) => ({
        sys: { type: "Link", linkType: "Entry", id: p.id },
      })),
    },
  });

  return NextResponse.json({
    message: "New episodes stored",
    data: entry,
  });
}

const getEpisodes = async () => {
  const res = await contentful.getEntries({
    content_type: "episode",
    select: ["fields.title", "fields.countNumber", "fields.publishDate"],
    order: ["-fields.publishDate"],
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
