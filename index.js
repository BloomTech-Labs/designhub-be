require('dotenv').config();
const express = require('express');

const server = express();

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
