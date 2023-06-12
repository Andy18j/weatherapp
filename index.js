const express = require("express");
const connection = require("./config/db");
const { userRouter } = require("./routes/user.route");
const cityRouter = require("./routes/city.route");
const redisClient = require("./helpers/redis");

const logger = require("./middlewares/logger");

require("dotenv").config()


const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("HOME PAGE 🏠")
})
app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})

app.use("/api/user",userRouter)

app.use("/api/weather",cityRouter);


app.listen(process.env.port,async()=>{
      try{
       await connection();
       console.log("connected to db")
      } catch(err) {
        console.log(err.message)
      }
console.log(`port is running at the ${process.env.port}`)
})


