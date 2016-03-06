exports.getPrompt = function(ws){
  var concat = "";
  for(var i = 0; i < ws.length;i++){
    concat += ws[i];
  }
  return anagram(concat);
}


function anagram(s) {
    q = "";
    while (s.length > 0) {
        i = Math.floor(Math.random() * s.length);
        q += s.charAt(i);
        s = s.substring(0,i) + s.substring(i+1);
    }
    return q;
}
