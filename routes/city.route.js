
const {Router } = require("express");
const { authenticator } = require("../middlewares/auth");
const { CityData, mostSearchedCity } = require("../controllers/city.controller");


const cityRouter = Router();

cityRouter.get("/mostsearchedcity",mostSearchedCity);
cityRouter.get("/:city",authenticator,getCityData);

module.exports = {
    cityRouter
}