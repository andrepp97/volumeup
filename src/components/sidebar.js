import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    HomeIcon,
    SearchIcon,
    CollectionIcon,
    PlusCircleIcon,
    HeartIcon,
} from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Divider from './divider'

const mainMenu = [
    {
        label: 'Home',
        icon: HomeIcon,
    },
    {
        label: 'Search',
        icon: SearchIcon,
    },
    {
        label: 'Your Library',
        icon: CollectionIcon,
    },
]
const secondaryMenu = [
    {
        label: 'Create Playlist',
        icon: PlusCircleIcon,
    },
    {
        label: 'Liked Songs',
        icon: HeartIcon,
    },
]

const Sidebar = () => {
    // Hooks & State
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    // Lifecycle
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists()
                .then(data => setPlaylists(data.body.items))
                .catch(err => console.log(err))
        }
    }, [session, spotifyApi])

    // Render
    return (
        <aside className='w-fit min-w-fit h-screen overflow-y-auto p-6 hidden sm:inline'>
            <div className='text-gray-400 text-sm lg:text-base space-y-4 mb-24'>
                {mainMenu.map((menu, index) => (
                    <button
                        key={index}
                        className='flex items-center space-x-2 font-semibold hover:text-white'
                    >
                        <menu.icon className='w-5 h-5' />
                        <p>{menu.label}</p>
                    </button>
                ))}

                <Divider />

                {secondaryMenu.map((menu, index) => (
                    <button
                        key={index}
                        className='flex items-center space-x-2 font-semibold hover:text-white'
                    >
                        <menu.icon className='w-5 h-5' />
                        <p>{menu.label}</p>
                    </button>
                ))}

                <Divider />

                {playlists.map(playlist => (
                    <p
                        key={playlist.id}
                        onClick={() => setPlaylistId(playlist.id)}
                        className={`cursor-pointer hover:text-white ${playlistId == playlist.id && "text-white"}`}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;