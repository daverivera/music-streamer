import React, { useState } from 'react'

import Player from './children/Player'
import Playlist from './children/Playlist'

const MusicPlayer = () => {
    const [currentSong, setCurrentSong] = useState(null)

    return (
        <div>
            <Playlist onSongSelected={setCurrentSong} />
            <Player currentSong={currentSong} />
        </div>
    )
}

export default MusicPlayer
