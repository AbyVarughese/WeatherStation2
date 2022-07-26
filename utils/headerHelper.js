const headerHelper = {
  getHeader(station) {

    function getTemperatureC(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      return reading.temp;
    };

    function getTemperatureF(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      return Math.round(reading.temp * (9.0 / 5.0) + 32);
    }

    function getMaxTemp(readings) {
      if(readings.length == 0) { return "0.0"; }

      let max = -100.0;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.temp > max) {
          max = reading.temp;
        }
      }
      return max;
    }

    function getMinTemp(readings) {
      if(readings.length == 0) { return "0.0"; }

      let min = 100.0;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.temp < min) {
          min = reading.temp;
        }
      }
      return min;
    }

    function getPressure(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      return reading.pressure;
    };
    function getMaxPressure(readings) {
      if(readings.length == 0) { return "0.0"; }

      let max = -1000;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.pressure > max) {
          max = reading.pressure;
        }
      }
      return max;
    }
    function getMinPressure(readings) {
      if(readings.length == 0) { return "0.0"; }

      let min = 1000;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.pressure < min) {
          min = reading.pressure;
        }
      }
      return min;
    }

    function getWeather(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];

      if (reading.code == 100) {
        return "Clear";
      }
      if (reading.code == 200) {
        return "Partial clouds";
      }
      if (reading.code == 300) {
        return "Cloudy";
      }
      if (reading.code == 400) {
        return "Light Showers";
      }
      if (reading.code == 500) {
        return "Heavy Showers";
      }
      if (reading.code == 600) {
        return "Rain";
      }
      if (reading.code == 700) {
        return "Snow";
      }
      if (reading.code == 800) {
        return "Thunder";
      }
      return "0";
    };
    function getWindSpeed(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      if (reading.wind_speed == 1) {
        return "0";
      }
      if (reading.wind_speed >= 2 && reading.wind_speed <= 5) {
        return "1";
      }
      if (reading.wind_speed >= 6 && reading.wind_speed <= 11) {
        return "2";
      }
      if (reading.wind_speed >= 12 && reading.wind_speed <= 19) {
        return "3";
      }
      if (reading.wind_speed >= 20 && reading.wind_speed <= 28) {
        return "4";
      }
      if (reading.wind_speed >= 29 && reading.wind_speed <= 38) {
        return "5";
      }
      if (reading.wind_speed >= 39 && reading.wind_speed <= 49) {
        return "6";
      }
      if (reading.wind_speed >= 50 && reading.wind_speed <= 61) {
        return "7";
      }
      if (reading.wind_speed >= 62 && reading.wind_speed <= 74) {
        return "8";
      }
      if (reading.wind_speed >= 75 && reading.wind_speed <= 88) {
        return "9";
      }
      if (reading.wind_speed >= 89 && reading.wind_speed <= 102) {
        return "10";
      }
      if (reading.wind_speed >= 103 && reading.wind_speed <= 117) {
        return "11";
      }
      return "0";
    }


    function getMaxWindSpeed(readings) {
      if(readings.length == 0) { return "0.0"; }

      let max = -100;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.wind_speed > max) {
          max = reading.wind_speed;
        }
      }
      return max;
    }
    function getMinWindSpeed(readings) {
      if(readings.length == 0) { return "0.0"; }

      let min = 1000;
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (reading.wind_speed < min) {
          min = reading.wind_speed;
        }
      }
      return min;
    }
    function getWindChill(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      return Math.round(13.12 + (0.6215 * reading.temp) - (11.37 * Math.pow(reading.wind_speed, 0.16)) + (0.3965 * reading.temp) * (Math.pow(reading.wind_speed, 0.16)));
    }
    function getWindDirection(readings) {
      if(readings.length == 0) { return "0.0"; }
      const reading = readings[readings.length - 1];
      if (reading.wind_dir >= 348.76 && reading.wind_dir <= 11.25) {
        return "North";
      }
      if (reading.wind_dir >= 11.26 && reading.wind_dir <= 33.75) {
        return "NorthNorthEast";
      }
      if (reading.wind_dir >= 33.76 && reading.wind_dir <= 56.25) {
        return "NorthEast";
      }
      if (reading.wind_dir >= 56.26 && reading.wind_dir <= 78.75) {
        return "EastNorthEast";
      }
      if (reading.wind_dir >= 78.76 && reading.wind_dir <= 101.25) {
        return "East";
      }
      if (reading.wind_dir >= 101.25 && reading.wind_dir <= 123.75) {
        return "EastSouthEast";
      }
      if (reading.wind_dir >= 123.76 && reading.wind_dir <= 146.25) {
        return "SouthEast";
      }
      if (reading.wind_dir >= 146.26 && reading.wind_dir <= 168.75) {
        return "SouthSouthEast";
      }
      if (reading.wind_dir >= 168.76 && reading.wind_dir <= 191.25) {
        return "South";
      }
      if (reading.wind_dir >= 191.26 && reading.wind_dir <= 213.75) {
        return "SouthSouthWest";
      }
      if (reading.wind_dir >= 213.76 && reading.wind_dir <= 235.25) {
        return "SouthWest";
      }
      if (reading.wind_dir >= 235.26 && reading.wind_dir <= 258.75) {
        return "WestSouthWest";
      }
      if (reading.wind_dir >= 258.76 && reading.wind_dir <= 281.25) {
        return "West";
      }
      if (reading.wind_dir >= 281.26 && reading.wind_dir <= 303.75) {
        return "WestNorthWest";
      }
      if (reading.wind_dir >= 303.76 && reading.wind_dir <= 326.25) {
        return "NorthWest";
      }
      if (reading.wind_dir >= 326.26 && reading.wind_dir <= 348.75) {
        return "NorthNorthWest";
      }
      return "0";
    }
    function getTempReadingsImg(readings) {
      if(readings.length < 3) { return "blank.png"; }
      const last = readings[readings.length - 1];
      const previous = readings[readings.length - 3];
      if (previous.temp < last.temp) {
        return "tempRising.png";
      } else if (previous.temp > last.temp) {
        return "tempFalling.png";
      } else {
        return "tempSteady.png";
      }
    }
    function getWindReadingsImg(readings) {
      if(readings.length < 3) { return "blank.png"; }
      const last = readings[readings.length - 1];
      const previous = readings[readings.length - 3];
      if (previous.wind_speed < last.wind_speed) {
        return "windRising.png";
      } else if (previous.wind_speed > last.wind_speed) {
        return "windFalling.png";
      } else {
        return "windSteady.png";
      }
    }
    function getPressureReadingsImg(readings) {
      if(readings.length < 3) { return "blank.png"; }
      const last = readings[readings.length - 1];
      const previous = readings[readings.length - 3];
      if (previous.pressure < last.pressure) {
        return "pressureRising.png";
      } else if (previous.pressure > last.pressure) {
        return "pressureFalling.png";
      } else {
        return "pressureSteady.png";
      }
    }
    const header = {
      temperatureC: getTemperatureC(station.readings),
      temperatureF: getTemperatureF(station.readings),
      pressure: getPressure(station.readings),
      maxPressure: getMaxPressure(station.readings),
      minPressure: getMinPressure(station.readings),
      weather: getWeather(station.readings),
      maxTemp: getMaxTemp(station.readings),
      minTemp: getMinTemp(station.readings),
      windSpeed: getWindSpeed(station.readings),
      maxWindSpeed: getMaxWindSpeed(station.readings),
      minWindSpeed: getMinWindSpeed(station.readings),
      windChill: getWindChill(station.readings),
      windDirection: getWindDirection(station.readings),
      tempReadingsImg: getTempReadingsImg(station.readings),
      windReadingsImg: getWindReadingsImg(station.readings),
      pressureReadingsImg: getPressureReadingsImg(station.readings),
    }
    return header;
  }
}

module.exports = headerHelper;