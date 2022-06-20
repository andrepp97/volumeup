import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify.js'

const useSongInfo = () => {
    // Hooks & State
    const spotifyApi = useSpotify()
    const currentTrackId = useRecoilValue(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    // Lifecycle
    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const headers = {
                    Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                }
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, { headers: headers })
                    .then(res => res.json())
                    .catch(err => console.log("Failed to fetch song info", err))

                setSongInfo(trackInfo)
            }
        }

        fetchSongInfo()
    }, [currentTrackId, spotifyApi])

    // Return
    return songInfo
}

export default useSongInfo;