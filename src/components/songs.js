import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './song'

const Songs = () => {
    // State
    const playlist = useRecoilValue(playlistState)

    // Render
    return (
        <div className='flex flex-col p-2 md:p-4 lg:p-6 mb-24'>
            {playlist?.tracks.items.map((item, index) => (
                <Song
                    key={item.track.id}
                    order={index + 1}
                    track={item}
                />
            ))}
        </div>
    );
}

export default Songs;