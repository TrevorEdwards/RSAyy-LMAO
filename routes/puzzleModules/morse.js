var morse = require('morse');

exports.getPrompt = function(ws){
  var concat = "";
  for(var i = 0; i < ws.length;i++){
    concat += ws[i];
  }
  return morse.encode(concat);
}
