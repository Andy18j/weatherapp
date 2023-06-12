const {redisClient} = require("../helpers/redis")
const axios = require('axios')
const usercitieslist = require("../models/city.model")
const api_key = process.env.weatherapi;



const CityData = async (req,res) =>{
    try {
         req.param.city  || req.body.city; 
        const iscityIncache = await redisClient.get(city)
         if (iscityIncache) return res.status(202).send(data.iscityIncache)

         const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${city}`)
         const weatherdata = response.data;

         redisClient.set(city,JSON.stringify(weatherdata),{Ex : 30 * 60})

          await usercitieslist.findOneAndUpdate({userID:req.body.userID},{
          userID:req.body.userID, $push:{preseraches:city}},{new :true,upsert:true,setDefaultsOnInsert:true});


          return res.send(data.weatherdata)
    }
    catch(err){
       return res.status(404).send(err.message)
    }
}

module.exports = {
      CityData
}