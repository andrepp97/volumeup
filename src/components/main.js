import Image from 'next/image'
import { shuffle } from 'lodash'
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import UserProfile from './userProfile';
import Songs from './songs'

const colors = [
    "from-indigo-600",
    "from-orange-600",
    "from-red-600",
    "from-blue-600",
    "from-green-600",
    "from-purple-600",
    "from-pink-600",
    "from-yellow-600",
]

const Main = () => {
    // Hooks & State
    const spotifyApi = useSpotify()
    const [color, setColor] = useState(null)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const playlistId = useRecoilValue(playlistIdState)

    // Lifecycle
    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
            .then(data => setPlaylist(data.body))
            .catch(err => console.log("Something went wrong!", err))
    }, [spotifyApi, playlistId])

    // Render
    return (
        <div className="flex-grow h-screen overflow-y-auto border-l border-gray-700 text-gray-100">

            <UserProfile />

            <section className={`flex items-end space-x-6 w-full h-72 p-8 bg-gradient-to-b ${color} to-slate-900`}>
                {playlist && (
                    <Image
                        className="shadow-2xl object-cover rounded"
                        src={playlist?.images?.[0].url}
                        alt="Playlist Cover"
                        height={200}
                        width={200}
                    />
                )}
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl">
                        {playlist?.name}
                    </h1>
                </div>
            </section>

            <Songs />

        </div>
    );
}

export default Main;