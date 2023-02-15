// install dependcies
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors()); 
app.use(express.json()); 

app.use(express.static("./public" )); 

const PORT = process.env.PORT || 5050;

const songsRoutes = require('./routes/songsRoutes');

app.use("/songs", songsRoutes);

app.get("/", (req,res) => {
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(` App listening on port ${PORT} ` );
})