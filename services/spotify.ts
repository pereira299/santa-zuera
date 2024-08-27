import { List } from "@/types/global";
import { SpotifyEpisode, Podcast, SpotifyAuth } from "@/types/spotify";

class Spotify {
  private baseUrl: string = "https://api.spotify.com/v1";
  private token: string = "";
  private expireToken = 0;
  private podcastId: string = "0fraBTCiKHE56C7rMMQggh";

  /**
   * Get token from Spotify API
   *
   * @returns {Promise<string>} token
   */
  private async getToken(): Promise<SpotifyAuth> {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID || "",
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
      }),
    });
    const data = await res.json();
    return data;
  }

  /**
   * Check if token is still valid, if not get a new one
   *
   * @returns {Promise<string>} token
   */
  private async hasToken(): Promise<string> {
    const now = new Date().getTime();
    if (now + 1000 < this.expireToken && this.token) {
      return this.token;
    }

    const token = await this.getToken();
    this.token = token.access_token;
    this.expireToken = now + token.expires_in * 1000;
    return token.access_token;
  }

  async getPodcast(): Promise<Podcast> {
    // Get token
    const token = await this.hasToken();
    // Crawl Spotify API
    const res = await fetch(`${this.baseUrl}/shows/${this.podcastId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return await res.json();
  }

  async getEpisodeList(page?: number, take: number = 50): Promise<List<SpotifyEpisode>> {
    // Get token
    const token = await this.hasToken();
    const start = page ? (page-1) * take : 0;
    // Crawl Spotify API
    const res = await fetch(
      `${this.baseUrl}/shows/${this.podcastId}/episodes?offset=${start}&limit=${take}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return await res.json();
  }
}

export default Spotify;
