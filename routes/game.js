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
var gPlyN = {}; //All player names
var gSolutions = [];

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

// Starts next round of game
function newGame(ringCount) {
  gMapNumber = 0; // Update sequence number of map
  gGameNumber++; // Game sequence number
  gPlyN = {};

  var rSAObj = generateRSA();
  var rings = generateRings();
  var players = new Map();

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
  var rings = [];
  for(var i = 0; i < ringCount; i++){
    //Generate the answer
    ans = {};
    //Add a puzzle
    var puzzle = puzzleFactory.getNormalPuzzle();
    rings.push(puzzle.getPrompt(ans));
    gSolutions[i] = ans;
  }
}

// Returns an object containing the three words that are a puzzle's answer
function puzzleAnswer(ringIndex){

}

//Checks that a given answer is equal to the correct.  Advances the user if so and returns true.
function checkAnswer(uid, ans){
  var ringNum = gGame.players.get(uid).ring;
  for (var i = 0; i < gSolutions[ringNum].length; i++){
    if (gSolutions[ringNum][i] != ans[i]){
      return false;
    }
  }
  advanceUser(uid);
  return(true);
}

// Advances the user in the game
function advanceUser(uid){

}

//Maps up to three digits to a word
function numToWord(num){
  return "placeholder";
}

//Adds a player to the current game.
//Returns false if player name already exists
function addPlayer(name){
  if(gPlyN[name]) return false;

  var ply = {};

  var num = "0000" + (Math.floor(Math.random() * 100000)).toString();
  num = num.substring(num.length - 5);
  var uid = name + num;

  ply.uid = uid;
  ply.ring = 0;
  ply.name = name;

  if (uidMap.has(uid)) {
      return false;
  } else {
      uidMap.set(uid, ply);
      gPlyN[name] = true;
      return true;
  }

}


function getUsername(uid) {
    if (uidMap.has(uid)) {
        return uidMap.get(uid);
    }
    return "This uid does not exist.";
}
