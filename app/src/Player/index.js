import React, { useState, useEffect } from 'react'
import { Howl, Howler } from 'howler';
import axios from 'axios'

const Player = () => {
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

    const step = () => {
        const seek = song.seek() || 0
        const progress = (((seek / song.duration()) * 100) || 0)

        setCurrentTime(formatTime(seek))
        setSongProgress(progress)

        // If the sound is still playing, continue stepping.
        if (song.playing()) {
            requestAnimationFrame(step)
        }

    }

    useEffect(() => {
        const url = 'http://localhost:3000/track/ninja.mp3'
        const song = new Howl({
            src: url,
            onload: () => setDuration(formatTime(song.duration()))
        })

        setSong(song)
    }, [])

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
            <p>{songProgress}%</p>
            <button onClick={onPlay}>{ pause ? 'pause' : 'play' }</button>
            <button onClick={onStop}>stop</button>
        </div>
    )
}

export default Player
