"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const headerHelper = require("../utils/headerHelper");

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
    const newReading = {
      id: uuid.v1(),
      dateTime: new Date().toString().substring(0,24),
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      wind_speed: Number(request.body.wind_speed),
      wind_dir: Number(request.body.wind_dir),
      pressure: Number(request.body.pressure)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
