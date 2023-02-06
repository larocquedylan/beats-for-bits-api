const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

const PORT = process.env.port || 1111;

app.get('/wallet', (req, res) => {
    axios.get(walletEndpoint, process.env)
        .then(response => {
        let wallet = response.data; // {name: 'Music', balance: 80000 }

    // write this response to our server or our file system?
    // writing to file is asynchronous therefore needs a callback
    // example
    // fs.writeFile('file-path', JSON.stringify(response.data), () => console.log('file wrote to system)

    // send this response to our front-end api call
    res.json(wallet); // returns in the response to our client


})
.catch(error => {
    console.log(error);
})
})

const walletEndpoint = "https://legend.lnbits.com/api/v1/wallet";
const headers = { headers: {'X-api-key': '0dc7444ff5fc446aa53949f96adb7dc1'}};


app.get("/songs", (req,res) => {
    console.log(1);
    // get some data from either a json or a database

    res.json([
        {id: 1, title: "song1", filetype: "wav"},
        {id: 2, title: "song2", filetype: "wav"}
    ])
})


app.listen(PORT, () => {
    console.log(` APP listening on port ${PORT} ` );
})