//modules

var express   = require('express');
var app       = module.exports = express();
var config    = require('../config');
var Reader    = require('popstar-file-reader');
var reader    = new Reader(config.reader ? config.reader : {});
var _         = require('lodash');
var async     = require('async');
var md        = require('marked');

app.disable('etag');

//routes
app.get('/api/feed', function(req,res) {
  var feed = reader.getFeed(['feeds'], 0, 0, function(result) {
    res.send(result);
  });
});

app.get('/api/users', function(req,res) {
  var query = req.query;

  var feed = reader.getFeed(['users'], 0, 0, function(result) {
    if(query.random === 'true') {
      result.sort(function() {
        return (Math.round(Math.random())-0.5);
      });
    }

    res.send(result);
  });
});
