var baseurl = "http://rsalmao.azurewebsites.net";
var gamestate = 0;
var uid = 0;
var ring = 0;
var timerid = null;
var gid = 0;
var mid = 0;
var safeToQuery = true;

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

var safeToQuery;
//Queries the server every second
function update(){

  if(safeToQuery){
    safeToQuery = false;
    httpGetAsync(baseurl + "/gameStatus/"+mid+"/"+gid, function(response){
      var resp = JSON.parse(response);
      console.log(resp);
    });
    safeToQuery = true;
  }
    timerid = setTimeout(function(){update()},1000);
}//clearInterval(timerid) to stop updating.
update();




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
	ring = 0;

      term.echo('Welcome');
    }
  }
)}



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
      }
    } else{
        term.echo("");
      }
    },{
        greetings: function(callback){
          const greet = 'Welcome to the game. Please type your name';
          callback(greet);
        },
        name: 'TrevorTerminal', //not necessary
        height: 200,
        width: 1001,
        prompt: ': '});
      });
