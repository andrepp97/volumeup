import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { MusicNoteIcon } from '@heroicons/react/solid'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { millisToMinutesAndSeconds } from '../lib/timeFormat'
import useSpotify from '../hooks/useSpotify';

const Song = ({ order, track }) => {
    // Hooks & State
    const spotifyApi = useSpotify()
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    // Function
    const playSong = () => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri],
        })
    }

    // Render
    return (
        <div
            onClick={playSong}
            className="flex justify-between md:grid md:grid-cols-2 space-x-1 md:space-x-2 text-gray-400 hover:text-gray-200 rounded cursor-pointer p-4 hover:bg-gray-800"
        >

            <div className="flex items-center space-x-4">
                {
                    isPlaying && currentTrackId == track.track.id
                        ? <MusicNoteIcon className="w-4 mr-4 text-green-400" />
                        : <p className="text-right w-4 mr-4">
                            {order}
                        </p>
                }
                <Image
                    src={track?.track.album.images[0].url}
                    className="rounded object-cover"
                    alt={track?.track.name}
                    height={48}
                    width={48}
                />
                <div>
                    <p className={`${currentTrackId == track.track.id ? "text-green-400" : "text-white"} font-medium truncate w-44 lg:w-64 xl:w-80`}>
                        {track.track.name}
                    </p>
                    <p>
                        {track.track.artists[0].name}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-end md:justify-between md:ml-0 space-x-2">
                <p className="hidden md:inline">
                    {track.track.album.name}
                </p>
                <p>
                    {millisToMinutesAndSeconds(track.track.duration_ms)}
                </p>
            </div>

        </div>
    );
}

export default Song;