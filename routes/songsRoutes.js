const express = require("express");
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    res.send("hello"); // returns in the response to our client
})

const songList = [
    { name: '122G2.wav', path: './public/songs/1.wav' },
    { name: '122O3.wav', path: './public/songs/2.wav' },
    { name: '122S1.wav', path: './public/songs/3.wav' },
    { name: '2623.wav', path: './public/songs/4.wav' },
    { name: '322H1.wav', path: './public/songs/5.wav' },
    { name: '322J1.wav', path: './public/songs/6.wav' },
    { name: '1121U1.wav', path: './public/songs/7.wav' },
    { name: '1221E.wav', path: './public/songs/8.wav' },
    { name: 'May25.wav', path: './public/songs/9.wav' },
  ];
  
router.get("/:name", (req, res) => {
    const filename = req.params.name;
    const song = songList.find(song => song.name === filename);
    console.log(filename);

    if (!song) {
        return res.status(404).json({ error: 'File not found hoe!' });
    }

    try {
        res.download(song.path, filename);
        console.log(song.path);
        console.log(filename)
        console.log("success");
    } catch (error) {
        console.error(error);
        console.log("didnt work");
        return res.status(500).json({error: 'Error while downloading song'});
    }
});

module.exports = router; 