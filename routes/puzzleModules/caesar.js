exports.getPrompt = function(ws){
  console.log('TODO');
  return('TODO: ' + ws);
}

function caesar(s, i) {
	var output = "";
	for (var c = 0; c < s.length; c++) {
		output += String.fromCharCode(97+((s.charCodeAt(c)%97+i)%26+26)%26);
	}
	return output;
}
