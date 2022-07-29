"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const headerHelper = require("../utils/headerHelper");
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);

    const station = stationStore.getStation(stationId);
    station.header = headerHelper.getHeader(station);

    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);

    if(request.body.code.length == 0 || request.body.temp.length == 0 || request.body.wind_speed.length == 0 || request.body.wind_dir.length == 0 || request.body.pressure.length == 0) {
      logger.warn("Invalid values");
    }else {
      const newReading = {
        id: uuid.v1(),
        dateTime: new Date().toString().substring(0, 24),
        code: Number(request.body.code),
        temp: Number(request.body.temp),
        wind_speed: Number(request.body.wind_speed),
        wind_dir: Number(request.body.wind_dir),
        pressure: Number(request.body.pressure)
      };
      logger.debug("New Reading = ", newReading);
      stationStore.addReading(stationId, newReading);
    }
    response.redirect("/station/" + stationId);
  },

  async generateReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);


    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${station.latitude}&lon=${station.longitude}&appid=018ff37f1d07f2f78ec77f30abe6e743&units=metric`
    const result = await axios.get(requestUrl);

    if (result.status == 200) {
      const reading = result.data;
      logger.info("received data", result.data);
      const newReading = {
        id: uuid.v1(),
        dateTime: new Date(reading.dt * 1000).toString().substring(0, 24),
        code: Number(reading.weather[0].id),
        temp: Number(reading.main.temp),
        wind_speed: Number(reading.wind.speed),
        wind_dir: Number(reading.wind.deg),
        pressure: Number(reading.main.pressure)
      };
      logger.debug("New Reading = ", newReading);
      stationStore.addReading(stationId, newReading);
    }
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
