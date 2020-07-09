import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import List from '@material-ui/core/List'

import SongItem from './children/SongItem'

const Playlist = ({ onSongSelected }) => {
    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        async function fetchPlaylist() {
            const { data: songsList } = await axios.get('http://localhost:3000/settings/folder-structure')
            setPlaylist(songsList)
        }
        fetchPlaylist()
    }, [])

    return (
        <List dense={true}>
            {playlist.map((song, index) =>
                <SongItem
                    song={song}
                    songIndex={index}
                    onSongSelected={(id, name) => onSongSelected(name)}
                />
            )}
        </List>
    )
}

Playlist.propTypes = {
    onSongSelected: PropTypes.func.isRequired
}

export default Playlist
