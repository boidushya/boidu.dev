export const YOUTUBE_MUSIC_CONFIG = {
	API_KEY: "AIzaSyD_-SE7VcOCfum3vfbqGn3iypOtmnaJJj0",
	PLAYLIST_ID: "PLAVz83Xtm7v2SeBdjrAFBNCwYIft8ZdVl",
	MAX_RESULTS: 6,
} as const;

export const MUSIC_LINKS = {
	YOUTUBE_MUSIC_PLAYLIST:
		"https://music.youtube.com/playlist?list=PLAVz83Xtm7v2SeBdjrAFBNCwYIft8ZdVl&si=cUgD3kahp6Gcheeo",
	FAVICON: "https://music.youtube.com/img/favicon_32.png",
} as const;

export const MUSIC_TEXTS = {
	SECTION_TITLE: "As you might've figured, I love music!",
	PLAYLIST_DESCRIPTION: "What I listen to when I'm in the zone",
	LOADING: "Loading...",
} as const;

export interface Song {
	title: string;
	link: string;
	artist: string;
	thumbnail: string;
}

interface YouTubePlaylistItem {
	snippet: {
		title: string;
		resourceId: {
			videoId: string;
		};
		videoOwnerChannelTitle: string;
		thumbnails: {
			high: {
				url: string;
			};
		};
	};
}

interface YouTubeApiResponse {
	items: YouTubePlaylistItem[];
}

export const cleanArtistName = (channelTitle: string): string => {
	return channelTitle.replace(/ - Topic/g, "").replace(/VEVO/g, "");
};

export const buildYouTubeApiUrl = (): string => {
	const { API_KEY, PLAYLIST_ID, MAX_RESULTS } = YOUTUBE_MUSIC_CONFIG;
	return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
};

export const transformYouTubeResponse = (data: YouTubeApiResponse): Song[] => {
	return data.items.map((item) => ({
		title: item.snippet.title,
		link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
		artist: cleanArtistName(item.snippet.videoOwnerChannelTitle),
		thumbnail: item.snippet.thumbnails.high.url,
	}));
};
