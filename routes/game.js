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

  var rSAObj = generateRSAkeys();
  var rings = generateRings();
  var players = new Map();

  gGame = {
    rSAObj,
    rings,
    players,

  };
}

// Generates RSA, returning an object of p1, p2, n (?)
function generateRSAkeys(){
  var p = 0;
  var q = 0;
  var privkey = 0;
  do {
    p = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(p));
  do {
    q = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(q) || q==p);
  do {
    privkey = Math.floor(Math.random()*(899) + 100);
  } while (!isPrime(privkey));
  var phi = (p-1)*(q-1);
  
  var inverse = function(privkey, phi) {
    var b0 = phi
    var t;
    var q;
    var x0 = 0, x1 = 1;
    if (phi == 1) return 1;
    while (privkey > 1) {
      q = Math.floor(privkey / phi);
      t = phi, phi = privkey % phi, privkey = t;
      t = x0, x0 = x1 - q * x0, x1 = t;
    }
    if (x1 < 0) x1 += b0;
    return x1;
  }

  var pubkey = inverse(privkey, phi);
  return {p:p, q:q, privkey:privkey, pubkey:pubkey};
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

//Checks that a given answer is equal to the correct.  Advances the user if so.
function checkAnswer(uid, ans){
  var ringNum = gGame.players.get(uid).ring;
  //TODO: need a break
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

function isPrime(n) {
  if (n==leastFactor(n)) return true;
  return false;
};


function leastFactor(n){
  if (n%2==0) return 2;  
  if (n%3==0) return 3;  
  if (n%5==0) return 5;  
  var m = Math.sqrt(n);
  for (var i=7;i<=m;i+=30) {
    if (n%i==0)      return i;
    if (n%(i+4)==0)  return i+4;
    if (n%(i+6)==0)  return i+6;
    if (n%(i+10)==0) return i+10;
    if (n%(i+12)==0) return i+12;
    if (n%(i+16)==0) return i+16;
    if (n%(i+22)==0) return i+22;
    if (n%(i+24)==0) return i+24;
  }
  return n;
};
