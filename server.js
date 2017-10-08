var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', proxy({
  target: 'https://sky-cast-go-proxy.herokuapp.com/',
  router: {
    'localhost:3000': 'http://localhost:8080'
  },
  changeOrigin: true,
  logLevel: 'debug'
}));
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.port || 3000);
