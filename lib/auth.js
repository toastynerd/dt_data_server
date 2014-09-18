'use strict';

var mongo = require('mongodb').MongoClient;

module.exports = function(req, res , next) {
  console.log('authing it up');
  var key = req.body.key || req.headers.key;
  mongo.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/distributedtwitter-development', function(err, db) {
    if (err) return res.status(500).send(err);

    var collection = db.collection('keys');

    collection.findOne({'key':key}, function(err, data) {
      if (err) {
        res.status(500).send(err);
        return db.close();
      }

      if (!data) {
        res.status(401).send('nope');
        return db.close();
      }

      db.close();
      return next();
    });
  });
};
