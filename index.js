// install dependcies
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
app.use(cors()); // enable CORS - do I need to make this only available for my client?
app.use(express.json()); // allow api to accept a JSON body via POST / PATCH / ETC
app.use(express.static("./public" )); // serve pictures for gallery, and songs? -- public isn't in the url

const PORT = process.env.PORT || 5050;


const walletRoutes = require('./routes/walletRoutes');

app.use("/wallet", walletRoutes);

// app.get("/songs", (req,res) => {
//     console.log(1);
//     // get some data from either a json or a database

//     res.json([
//         {id: 1, title: "song1", filetype: "wav"},
//         {id: 2, title: "song2", filetype: "wav"}
//     ])
// })

app.get("/", (req,res) => {
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(` App listening on port ${PORT} ` );
})