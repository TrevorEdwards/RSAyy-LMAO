var mongo = require('mongodb'),
    schedule = require('node-schedule'),
    privatedat = require('privatedata');

var Server = mongo.Server,
    Db = mongo.Db;

var MONGO_HOST = 'localhost';//process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var MONGO_PORT = 27017;//process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;

var server = new Server(MONGO_HOST, MONGO_PORT, {auto_reconnect: true});
db = new Db('rsalmao', server);
exports.db = db;

db.open(function(err, db) {
  console.log('opening db');
    if(!err) {
        console.log("Connected to 'RSALMAO' database.  Authenticating...");
        if (MONGO_HOST != 'localhost'){
          db.authenticate(privatedat.dbHostName, privatedat.dbHostPass, function(err, res){
            if (err) throw err;
            console.log('Authenticated!');
          });
        }
    } else{
      throw err;
    }
});
