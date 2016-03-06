/** This is where you can add your puzzle to the game.  As of now, we provide
a three word solution, and the puzzle must create a prompt around that.
**/

var caesar = require('./caesar');
var anagram = require('./anagram');
var final = require('./final');
var morse = require('morse');

const normalPuzzles = [
  caesar,
  anagram
]

exports.getNormalPuzzle = function(){
  return normalPuzzles[Math.floor(Math.random() * normalPuzzles.length)];
}

exports.getFinalPuzzle = function(){
  return final;
}
