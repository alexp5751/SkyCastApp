var express = require('express');
var app = express();
var request = require('request');
var async = require('async');
var bodyParser = require('body-parser');

app.get('/api/weather/:latitude,:longitude', function (req, res) {
  var latitude = req.params['latitude'],
    longitude = req.params['longitude'],
    time = Date.now() / 1000 | 0,
    tasks = {};

  // Fill tasks for getting historic weather for past 7 days
  for (var i = 1; i < 8; i++) {
    let j = i;
    tasks['historic' + j] = function (callback) {
      getTimeMachineWeather(latitude, longitude, time - (j * 86400), function (err, response) {
        if (err) {
          callback(err);
        } else {
          callback(null, response);
        }
      });
    }
  }

  //Add task for getting current and future weather
  tasks['forecast'] = function (callback) {
    getForecastWeather(latitude, longitude, function (err, response) {
      if (err) {
        callback(error);
      } else {
        callback(null, response);
      }
    })
  }

  async.parallel(tasks, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error. Check server logs.');
    } else {
      var responseObject = {
        'historic': [results['historic1'],
          results['historic2'],
          results['historic3'],
          results['historic4'],
          results['historic5'],
          results['historic6'],
          results['historic7']
        ],
        'forecast': results['forecast']
      }
      res.json(responseObject);
    }
  });
});

function getForecastWeather(lat, long, callback) {
  request('https://api.darksky.net/forecast/' + process.env.DARKSKY_APIKEY + '/' + lat + ',' + long, function (error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback(null, JSON.parse(body));
    }
  });
}

function getTimeMachineWeather(lat, long, time, callback) {
  request('https://api.darksky.net/forecast/' + process.env.DARKSKY_APIKEY + '/' + lat + ',' + long + ',' + time, function (error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback(null, JSON.parse(body));
    }
  });
}


app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 3000);
