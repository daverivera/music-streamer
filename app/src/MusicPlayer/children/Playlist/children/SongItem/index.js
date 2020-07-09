import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AudiotrackIcon from '@material-ui/icons/Audiotrack';

const SongItem = ({ song, songIndex, onSongSelected }) => (
    <ListItem key={songIndex} onClick={() => onSongSelected(songIndex, song)}>
        <ListItemIcon>
            <AudiotrackIcon />
        </ListItemIcon>
        <ListItemText
            primary={song}
        />
    </ListItem>
)

SongItem.propTypes = {
    onSongSelected: PropTypes.func.isRequired,
    song: PropTypes.string.isRequired,
    songIndex: PropTypes.number.isRequired
}

export default SongItem
