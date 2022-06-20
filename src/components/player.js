import Image from "next/image"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
    PlayIcon,
    PauseIcon,
    RewindIcon,
    FastForwardIcon,
    VolumeUpIcon,
    VolumeOffIcon,
} from "@heroicons/react/solid"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const controlClass = "w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-50"
const playClass = "h-10 w-10 cursor-pointer hover:scale-110 active:scale-95"

const Player = () => {
    // Hooks & State
    const songInfo = useSongInfo()
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(100)

    // Function
    const fetchCurrentSong = () => {
        spotifyApi.getMyCurrentPlayingTrack()
            .then(data => {
                setCurrentTrackId(data.body?.item?.id)
                spotifyApi.getMyCurrentPlaybackState()
                    .then(data => setIsPlaying(data.body?.is_playing))
            })
            .catch(err => console.log("Failed to fetch current song", err))
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                if (data?.body?.is_playing) {
                    spotifyApi.pause()
                    setIsPlaying(false)
                } else {
                    spotifyApi.play()
                    setIsPlaying(true)
                }
            })
    }

    const nextSong = () => {
        if (songInfo) {
            spotifyApi.skipToNext()
                .then(() => fetchCurrentSong())
        }
    }

    const prevSong = () => {
        if (songInfo) {
            spotifyApi.skipToPrevious()
                .then(() => fetchCurrentSong())
        }
    }

    // Lifecycle
    useEffect(() => {
        if (spotifyApi.getAccessToken()) fetchCurrentSong()
    }, [currentTrackIdState, currentTrackId, spotifyApi, session])

    useEffect(() => {
        if (volume >= 0 && volume <= 100) {
            let debounceFunction = setTimeout(() => {
                spotifyApi.setVolume(volume)
                    .catch(err => console.log(err))
            }, 500)

            return () => clearTimeout(debounceFunction)
        }
    }, [volume])

    // Render
    return (
        <div className="grid grid-cols-3 text-xs md:text-base text-gray-100 bg-gradient-to-t from-slate-900 to-gray-800 p-4">

            {/* Left */}
            <div className="flex items-center space-x-1 md:space-x-4">
                {songInfo && (
                    <Image
                        src={songInfo?.album?.images?.[0].url}
                        className="rounded"
                        objectPosition="center"
                        objectFit="cover"
                        height={56}
                        width={56}
                        alt=""
                    />
                )}
                <div className="space-y-1">
                    <p className='text-gray-100 text-md font-medium truncate w-28 sm:w-40 lg:w-64 xl:w-80'>
                        {songInfo?.name}
                    </p>
                    <p className="text-gray-300 text-xs">
                        {songInfo?.artists?.[0].name}
                    </p>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
                <RewindIcon
                    onClick={prevSong}
                    className={controlClass}
                />
                <button
                    disabled={!songInfo}
                    onClick={handlePlayPause}
                >
                    {isPlaying ? <PauseIcon className={playClass} /> : <PlayIcon className={playClass} />}
                </button>
                <FastForwardIcon
                    onClick={nextSong}
                    className={controlClass}
                />
            </div>

            {/* Right */}
            <div className="flex items-center justify-end space-x-1 md:space-x-2 pr-0 md:pr-4">
                {
                    volume < 1
                        ? <VolumeOffIcon
                            className={controlClass}
                            onClick={() => setVolume(75)}
                        />
                        : <VolumeUpIcon
                            className={controlClass}
                            onClick={() => setVolume(0)}
                        />
                }
                <input
                    min={0}
                    max={100}
                    type="range"
                    value={volume}
                    className="w-12 sm:w-24"
                    onChange={e => setVolume(Number(e.target.value))}
                />
            </div>

        </div>
    );
}

export default Player;