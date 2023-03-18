const express = require("express");
const Weather = require("../../model/weather");
const router = express.Router();
const axios = require("axios");

const ICON = "http://openweathermap.org/img/wn/";

router.get("/weather", (req, res) => {
  const cityName = req.query.cityName;
  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=d1fd00c4d67945dd0185d8888aff0ba6`;

  isInDataBase(cityName).then((isExist) => {
    if (!isExist) {
      axios.get(URL).then((result) => {
        let data = result.data;
        let filteredData = filterData(data);
        res.send(filteredData);
      });
    } else {
      res.send(`${cityName} is already saved`);
    }
  });
});

function filterData(data) {
  let iconKEY = data.weather[0].icon;
  let name = data.name;
  let temperature = data.main.temp;
  let condition = data.weather[0].description;
  let conditionPic = `${ICON}${iconKEY}.png`;
  let city = {
    name: name,
    temperature: temperature,
    condition: condition,
    conditionPic: conditionPic,
  };
  return city;
}

router.post("/weather", (req, res) => {
  let name = req.body.name;
  let temperature = req.body.temperature;
  let condition = req.body.condition;
  let conditionPic = req.body.conditionPic;

  let weather = new Weather({
    name: name,
    temperature: temperature,
    condition: condition,
    conditionPic: conditionPic,
  });

  weather.save().then(function (weather) {
    res.send(weather);
  });
});

router.get("/savedWeathers", (req, res) => {
  Weather.find().then((weather) => {
    res.send(weather);
  });
});

router.delete("/weather/:cityName", (req, res) => {
  let cityName = req.params.cityName;
  Weather.findOne({ name: cityName }).then((city) => {
    if (city == null) {
      res.status(404).send("city not found");
    } else {
      Weather.deleteOne({ name: cityName }).then(() => {
        res.send("deleted");
      });
    }
  });
});

function isInDataBase(cityName) {
  return Weather.findOne({ name: cityName }).then((res) => {
    return res != undefined;
  });
}

module.exports = router;
