var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname + '/build')));

var port = process.env.PORT || 5000;
var server = http.createServer(app).listen(port);