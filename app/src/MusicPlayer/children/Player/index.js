import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Howl, Howler } from 'howler'
import axios from 'axios'

import Slider from './children/Slider'

const Player = ({ currentSong }) => {
    const [song, setSong] = useState(null)
    const [pause, setPause] = useState(null)
    const [duration, setDuration] = useState(null)
    const [currentTime, setCurrentTime] = useState('0:00')
    const [songProgress, setSongProgress] = useState(0)

    const formatTime = fullTime => {
        const roundSeconds = Math.round(fullTime)
        const minutes = Math.floor(roundSeconds / 60) || 0
        const seconds = (roundSeconds - minutes * 60) || 0

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    const handleSeek = (percentage) => {
        song.seek(song.duration() * (percentage / 100))
        step()
    }

    const step = () => {
        const seek = song.seek() || 0
        const progress = (((seek / song.duration()) * 100) || 0)

        setCurrentTime(formatTime(seek))
        setSongProgress(progress)

        if (song.playing()) {
            requestAnimationFrame(step)
        }
    }

    useEffect(() => {
        if (!currentSong) return

        const url = `http://localhost:3000/songs/${currentSong}`
        const song = new Howl({
            src: url,
            onload: () => setDuration(formatTime(song.duration()))
        })

        setSong(song)
    }, [currentSong])

    const onPlay = () => {
        requestAnimationFrame(step)

        if (pause === null) {
            song.play()
            setPause(true)
            return
        }

        pause ? song.pause() : song.play()
        setPause(!pause)
    }

    const onStop = () => {
        setCurrentTime('0:00')
        setSongProgress(0)
        setPause(false)
        song.stop()
    }

    return (
        <div>
            <p>{currentTime} - {duration}</p>
            <Slider currentTime={currentTime} value={songProgress} onSeek={handleSeek} />
            <button onClick={onPlay}>{ pause ? 'pause' : 'play' }</button>
            <button onClick={onStop}>stop</button>
        </div>
    )
}

Player.propTypes = {
    currentSong: PropTypes.string
}

export default Player
