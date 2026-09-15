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

const LONERISM_ART_BASE =
	"https://yt3.googleusercontent.com/BpDRqoOatQNrzpRmxR-cFXsbxzdYKRnTnSCJ7kg6dC4KDE16FsgcG94WY0Xy9op5CrPuLo8ay2gWUQJW";

export const lonerismArt = (px: number): string =>
	`${LONERISM_ART_BASE}=w${px}-h${px}-l90-rw`;

export const ARTWORK_API = "https://artwork.boidu.dev/";

export const resizeAppleArt = (url: string, size: number): string =>
	url.replace(/\/\d+x\d+(bb)?\.(jpg|png|webp)/i, `/${size}x${size}$1.$2`);

export interface AnimatedArt {
	static: string | null;
	animated: string | null;
	videoUrl: string | null;
}

export const cleanSongTitle = (title: string): string =>
	title
		.replace(
			/\s*[([][^)\]]*(official|video|audio|lyric|visuali|remaster|hd|4k|mv)[^)\]]*[)\]]/gi,
			"",
		)
		.trim();

export const buildArtworkApiUrl = (song: string, artist: string): string =>
	`${ARTWORK_API}?s=${encodeURIComponent(cleanSongTitle(song))}&a=${encodeURIComponent(artist)}&storefront=us`;

export const fetchAnimatedArt = async (
	song: string,
	artist: string,
): Promise<AnimatedArt> => {
	const response = await fetch(buildArtworkApiUrl(song, artist));
	if (!response.ok) return { static: null, animated: null, videoUrl: null };
	const data = await response.json();
	if (data?.error) return { static: null, animated: null, videoUrl: null };
	return {
		static: data.static ?? null,
		animated: data.animated ?? null,
		videoUrl: data.videoUrl ?? null,
	};
};
