import { PlaylistItem } from "@/types/youtube";

export const getId = (data: PlaylistItem): number => {
  const name = data.snippet.title.split("|");
  const id =
    name.find((n) => n.includes("#"))?.replace(/[^#\d{1,8}]/g, "") || "";
  return Number(id.substring(1));
};

export const getTitle = (data: PlaylistItem): string => {
  const name = data.snippet.title.split("|");
  return name.find((n) => !n.includes("#"))?.trim() || "";
};

export const getThumbnail = (data: PlaylistItem): string => {
  const thumbs = data.snippet.thumbnails;
  // Get the highest resolution thumbnail
  return (
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url ||
    ""
  );
};
