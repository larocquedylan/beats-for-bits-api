
# Beats for Bits

Welcome to Beats for Bits, an experiment in tinkering with Bitcoin and the Lightning Network. It is web application where you can buy my music using satoshis - tiny units of Bitcoin. This was my capstone project for BrainStation's 3 month software engineering bootcamp. 

This is an accomponying backend for the front end which you can find on my profile labelled as beats-for-bits. 




## Run Locally

Clone the project

```bash
  git clone https://github.com/larocquedylan/beats-for-bits-api
```

Go to the project directory

```bash
  cd beats-for-bits-api
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  node --watch index.js
```


## Tech Stack


- Axios
- cors
- dotenv
- express
- fs
- path


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

'port'

I have removed wallet api and configuration for this repo as it was not longer in scope so the .env isn't really needed
