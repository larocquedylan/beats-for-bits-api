const router = require("express").Router();
const axios = require('axios');


const walletEndpoint = "https://legend.lnbits.com/api/v1/wallet";

// GET /wallet
router.get('/', (req, res) => {
    axios.get(walletEndpoint, { headers: {'X-api-key': process.env.ADMIN_KEY}})
        .then(response => {
        let wallet = response.data; // {name: 'Music', balance: 80000 }
        console.log(wallet);

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



module.exports = router;