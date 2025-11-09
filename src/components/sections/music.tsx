import { useQuery } from "@tanstack/react-query";
import { AnimatedContainer, AnimatedListItem } from "@/components/shared";
import { slideRightItemVariants } from "@/utils/animations";
import {
	buildYouTubeApiUrl,
	MUSIC_LINKS,
	MUSIC_TEXTS,
	Song,
	transformYouTubeResponse,
} from "@/utils/music";

const SongComponent = ({ title, thumbnail, link, artist }: Song) => {
	return (
		<AnimatedListItem variants={slideRightItemVariants}>
			<a href={link} target="_blank" rel="noreferrer">
				<div className="thumb-container">
					<img src={thumbnail} alt={title} className="max-w-[none]" loading="lazy" />
				</div>
				<div className="song-info">
					<h4>{title}</h4>
					<p> by {artist}</p>
				</div>
			</a>
		</AnimatedListItem>
	);
};

const MusicSection = () => {
	const fetcher = async (): Promise<Song[]> => {
		const url = buildYouTubeApiUrl();
		const response = await fetch(url);
		const data = await response.json();
		const songs = transformYouTubeResponse(data);
		console.log(songs);
		return songs;
	};

	const { data, error, isLoading, isError } = useQuery({
		queryKey: ["music"],
		queryFn: fetcher,
	});
	return (
		<>
			<h3>{MUSIC_TEXTS.SECTION_TITLE}</h3>
			<a className="ytm-title" href={MUSIC_LINKS.YOUTUBE_MUSIC_PLAYLIST}>
				<img src={MUSIC_LINKS.FAVICON} alt="Youtube Music Playlist" loading="lazy" />
				<p>{MUSIC_TEXTS.PLAYLIST_DESCRIPTION}</p>
			</a>
			<AnimatedContainer as="ol" id="songs" className="mt-4">
				{isLoading && <p className="animate-pulse">{MUSIC_TEXTS.LOADING}</p>}
				{isError && <p className="text-red-400">{error?.message}</p>}
				{data &&
					data.map((song) => <SongComponent key={song.title} {...song} />)}
			</AnimatedContainer>
		</>
	);
};

export default MusicSection;
