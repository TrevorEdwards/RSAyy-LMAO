var express = require('express'),
    game = require('./routes/game'),
    app = express(),
    http = require('http');

//http://rsalmao.azurewebsites.net/

var server_port = process.env.PORT || 8080 //process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = '127.0.0.1' //process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('port', server_port);
app.set('ip', server_ip_address);

function createIndex(req, res){
  res.sendFile(__dirname + '/index.txt');
  return console.log( 'Creating index with version: ' + process.version );
}


   app.get('/', createIndex);
   app.get('/puzzleInfo/:uid/:n', game.getPuzzleInfo); //Get info of puzzle n for user uid
   app.get('/mapInfo/:uid', game.getMapInfo); //Get map info for uid.  Sends a map id #
   app.get('/gameStatus/:mid/:gid', game.getGameStatus); //Data on whether the game has ended, what the map identifier is for uid
   app.get('/joinGame/:name', game.join); //User wants to join the game with name
   app.get('/solution/:uid/:solution', game.proposeSolution); //User wants to propose a solution for its current puzzle
   app.get('/activeGame', game.getActiveGame); //User wants to propose a solution for its current puzzle
   app.get('/trashTalk/:msg', game.trashTalk); //User wants to propose a solution for its current puzzle

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("RSALmao server listening at %s:%d ", app.get('ip'),app.get('port'));
});



//DEBUG
// process.on('uncaughtException', function (err) {
//     console.log(err);
// });
