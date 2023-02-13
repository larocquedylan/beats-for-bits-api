const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.use(express.json());

// get all songs endpoint for gallery
router.get('/', (req, res) => {
    const songs = getSongs();

    const songList = songs.map(({id, title, song, image,alt }) => {
        return {id, title, song, image, alt};
    })

    res.status(200).json(songList);
})

// get a specific song for details page
router.get('/:id', (req, res) => {
    const songs = getSongs();
    const songId = req.params.id;

    const song = songs.find((song => song.id === songId))

    if (!song) {
        return res.status(404).json({ error: 'File not found bro!' });
    }

    res.status(200).json(song);
     
})
  
// download individual song
router.get("/download/:songId", (req, res) => {
    const songId = req.params.songId;
    const songList = getSongs();
    console.log(songId);

    const song = songList.find(song => song.id === songId);

    if (!song) {
        return res.status(404).json({ error: 'File not found hoe!' });
    }

    try {
        res.download(`./public/songs/${songId}.wav`);
        console.log("heythere");
        console.log("success");
    } catch (error) {
        console.error(error);
        console.log("didnt work");
        return res.status(500).json({error: 'Error while downloading song'});
    }
});




// read song data
function getSongs() {
    const songsData = fs.readFileSync("data/songs.json");
    return JSON.parse(songsData);
  }

function getAllSongs() {
    const songs = getSongs();

    const songList = songs.map(({id, title, song, image }) => {
        return {id, title, song, image};
    })

    res.status(200).json(songList);
}

module.exports = router; 