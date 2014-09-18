'use strict';

var mongo = require('mongodb').MongoClient;
var crypto = require('crypto');

var key;
crypto.randomBytes(48, function(err, buf){
  if (err) throw err;
  key = buf.toString('hex');
  (function() {
    mongo.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/distributedtwitter-development', function(err, db) {
    if (err) throw err;

    var collection = db.collection('keys');

      collection.insert({'key': key}, function(err, data) {
        if (err) throw err;
        console.log('New key added:');
        console.log(data);
        console.log(key);
        db.close();
      });
    });
  })();
});
