// //Holds game state.  Make sure to use databases guys.
//var mongodb = require('shareddb'),
var puzzleFactory = require('./puzzleModules/puzzleFactory');
// app.get('/puzzleInfo/:uid/:n', game.getPuzzleInfo); //Get info of puzzle n for user uid
// app.get('/mapInfo/:uid', game.getMapInfo); //Get map info for uid.  Sends a map id #
// app.get('/gameStatus/:uid', game.getGameStatus); //Data on whether the game has ended, what the map identifier is for uid
// app.get('/joinGame/:name', game.join); //User wants to join the game with name
// app.get('/solution/:uid/:solution', game.proposeSolution); //User wants to propose a solution for its current puzzle

//IMPORTANT CONSTANTS~~~~~~~~~~~~~~~~~~~~~~~~~
//TODO since some of these could end up in DB.  Feel free to put stuff here though
var gMapNumber = 0; // Update sequence number of map
var gGameNumber = 0; // Game sequence number
var gGame = {};

//EXPORTS~~~~~~~~~~~~~~
exports.getPuzzleInfo = function(req, res) {

    var uid = Number( req.params.uid );
    var n = Number( req.params.n );


};

exports.getMapInfo = function(req, res) {

    var uid = Number( req.params.uid );


};

exports.getGameStatus = function(req, res) {

    var uid = Number( req.params.uid );


};

exports.join = function(req, res) {

    var name = Number( req.params.uid );


};

exports.proposeSolution = function(req, res) {

    var uid = Number( req.params.uid );
    var solution = Number( req.params.n );


};

//GAME STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createUid(name) {
	var num = "0000" + (Math.floor(Math.random() * 100000)).toString();
	num = num.substring(num.length - 5);
	var uid = name + num;
	return uid;
}

// Starts next round of game
function newGame(ringCount) {
  gMapNumber = 0; // Update sequence number of map
  gGameNumber++; // Game sequence number

  var rSAObj = generateRSA();
  var rings = generateRings();
  var players = [];

  gGame = {
    rSAObj,
    rings,
    players,
    
  };
}

// Generates RSA, returning an object of p1, p2, n (?)
function generateRSA(){

}

// Creates a list of puzzles representing each ring
function generateRings(ringCount){

}
