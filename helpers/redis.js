const redis = require("redis");
const ioredis = require("ioredis");

const redisClient = redis.createClient();
redisClient.on("connect", async ()=>{
    console.log("Connected to redis");
});
redisClient.on("err",  (err) =>{
    console.log(err.message);
});

redisClient.connect();

module.exports = {
    redisClient
}