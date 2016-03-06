
var baseurl = "http://rsalmao.azurewebsites.net"
var gamestate = 0;
var uid = 0;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function joinGame(name){
    var frag = '/joingame/'
    var url = baseurl.concat(frag).concat(name);
    httpGetAsync(url,function(callback){
	if(callback == ""){
	    term.echo("That name is already taken. Choose another.")
	}
	else{
	    var obj = JSON.parse(callback);
	    uid = obj.uid;
	    gamestate = 1;
	    term.echo('Welcome');
	}
    }
		)
}



jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {

	if (command !== '') {	    
	    command = command.trim();


	    if(gamestate == 0){
		joinGame(command);
	    }


	    else{
		
		switch(command){
		    case help: term.echo("Type in the answer to the problem to proceed");
		    break;

		    default: term.echo("idk");
		    break;
		    
		}
	    
	} else {
	    term.echo('');
	}
    }, {
	greetings: function(callback){
			const greet = 'Welcome to the game. Please type your name';
			callback(greet);
		},
    name: 'TrevorTerminal', //not necessary
    height: 200,
    width: 800,
    prompt: '\u27B3 '});
});

