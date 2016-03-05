/** This is where you can add your puzzle to the game.  As of now, we provide
a three word solution, and the puzzle must create a prompt around that.
**/

var caesar = require('./caesar');

const normalPuzzles = {
  caesar
}

exports.getNormalPuzzle = function(){
  normalPuzzles.getRandom(); //TODO random array element?
}

exports.getFinalPuzzle = function(){
  //TODO
}
