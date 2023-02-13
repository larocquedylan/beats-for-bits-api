// install dependcies
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors()); // enable CORS - do I need to make this only available for my client?
app.use(express.json()); // allow api to accept a JSON body via POST / PATCH / ETC

app.use(express.static("./public" )); // serve pictures for gallery, and songs? -- public isn't in the url

const PORT = process.env.PORT || 5050;

const walletRoutes = require('./routes/walletRoutes');
const songsRoutes = require('./routes/songsRoutes');

app.use("/wallet", walletRoutes);
app.use("/songs", songsRoutes);

app.get("/", (req,res) => {
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(` App listening on port ${PORT} ` );
})