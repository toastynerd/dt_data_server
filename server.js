'use strict';

var express = require('express');
var http = require('http');
var mongo = require('mongodb').MongoClient;
var bodyparser = require('body-parser');
var auth = require('./lib/auth');

var app = express();

app.use(bodyparser.json());

app.post('/api/v1/tweets', auth, function(req, res) {
  console.log('incoming');
  mongo.connect(process.env.MONGO_URL || 'mongodb://127.0.01:27017/distributedtwitter-developmnt', function(err, db) {
    if(err) return res.status(500).send(err);
    var collection = db.collection('tweets');

    collection.insert(req.body, function(err) {
      if(err) return res.status(500).send(err);

      res.status(200).send('added');
      return db.close();
    });
  });
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log('shhh, the server is listening');
});
