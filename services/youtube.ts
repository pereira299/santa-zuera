import { google, youtube_v3 } from "googleapis";
import { Channel, Playlist, PlaylistItem } from "@/types/youtube";

type contentType = "video" | "playlist" | "channel" | "playlistItem";

class GoogleYoutube {
  private youtube: youtube_v3.Youtube;

  constructor() {
    this.youtube = google.youtube({
      version: "v3",
      auth: process.env.GCP_API_KEY,
    });
  }
  async search(search: string, type: contentType[]): Promise<any> {
    const res = await this.youtube.search
      .list({
        part: ["snippet"],
        q: search,
        type: type,
      })
      .catch((err) => {
        return err.response;
      });
    return res.data;
  }

  async getChannel(channelId:string): Promise<Channel> {
    const res = await this.youtube.channels
      .list({
        part: ["snippet"],
        id: [channelId],
      })
      .catch((err) => {
        return err.response;
      });

    return res.data.items[0];
  }

  async getPlaylist(playlistId: string): Promise<Playlist>{
    const res = await this.youtube.playlists
      .list({
        part: ["snippet", "contentDetails"],
        id: [playlistId] ,
      })
      .catch((err) => {
        return err.response;
      });
    return res.data.items[0];
  }

  async getPlaylistItems(playlistId: string, pageToken?: string,) {
    const res = await this.youtube.playlistItems
      .list({
        part: ["snippet", "contentDetails"],
        playlistId: playlistId,
        maxResults: 50,
        pageToken: pageToken,
      })
      .catch((err) => {
        return err.response;
      });

    const items: PlaylistItem[] = res.data.items;
    return {
      items: items,
      nextPageToken: res.data.nextPageToken as string | undefined,
    };
  }
}

export default GoogleYoutube;
