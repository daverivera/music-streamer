const express = require('express')
const Router = express.Router()
const fileSystem = require('fs')

const MUSIC_FORMATS = ['mp3', 'wav']

Router.get('/folder-structure', (req, res) => {
    //const currentFolderPath = req.get('folder-path')
    const currentFolderPath = '/Users/daverivera/Music'

    fileSystem.readdir(currentFolderPath, (err, files) => {
        if (err) {
            console.error(err)
            return
        }


        let musicFiles = []
        files.forEach((file) => {
            const extension = (file.split('.') || [null, null])[1]

            if (MUSIC_FORMATS.includes(extension)) {
                musicFiles.push(file)
            }
        })
        res.send(musicFiles)
    })
})

module.exports = Router
