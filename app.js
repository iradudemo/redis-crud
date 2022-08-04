const express = require("express");

const { createClient } = require("redis");

const app = express();
const PORT = 4001;
const redisClient = createClient();

redisClient.connect();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`app is listening at port: ${PORT}`);
});
