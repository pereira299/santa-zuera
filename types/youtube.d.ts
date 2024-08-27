export type Playlist = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        localized: {
            title: string;
            description: string;
        };
    };
    contentDetails: {
        itemCount: number;
    };
}

export type Video = {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
}

export type Channel = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: Thumbnails;
        localized: {
            title: string;
            description: string;
        };
        country: string;
    }
}

type Image = {
    url: string;
    width: number;
    height: number;
}

type Thumbnails = {
    default: Image;
    medium: Image;
    high: Image;
    standard: Image;
    maxres: Image;
}

export type YoutubeSearch = {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Array<Video | Channel | Playlist>;
}

export type PlaylistItem = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        playlistId: string;
        position: number;
        resourceId: {
            kind: string;
            videoId: string;
        };
    };
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
}