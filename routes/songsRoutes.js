const express = require("express");
const router = express.Router();

const fs = require('fs');
const path = require('path');

const songList = [
    { name: '1.22G2', path: '/public/songs/1.wav' },
    { name: '1.22O3', path: 'public/songs/2.wav' },
    { name: '1.22S1', path: '/public/songs/3.wav' },
    { name: '2.6.23', path: 'public/songs/4.wav' },
    { name: '3.22H1', path: '/public/songs/5.wav' },
    { name: '3.22J1', path: 'public/songs/6.wav' },
    { name: '11.21U1', path: '/public/songs/7.wav' },
    { name: '12.21E', path: 'public/songs8.wav' },
    { name: 'May25', path: 'public/songs/9.wav' },
  ];
  

router.get("/:filename", (req, res) => {
    const filename = req.params.filename;
    const song = songList.find(song => song.name === filename);
    if (!song) {
        return res.status(404).send('File not found');
    }
    res.download(song.path);
});


module.exports = router; 