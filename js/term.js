var baseurl = "http://rsalmao.azurewebsites.net";
var gamestate = 0;
var uid = 0;
var ring = 0;
var timerid = null;
var gid = 0;
var mid = 0;
var safeToQuery = true;
var lastTrash = "";



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
      //TRASH TALK @#(*$&@#*($))
      if(resp.trash != lastTrash){
          lastTrash = resp.trash;
        	responsiveVoice.speak(lastTrash);
      }
      if (resp.winner){
        //SOMEONE WON WOW
        console.log('wow someone won');
      } else {
        if(mid < resp.gMapNumber){
          //we're out of date
          updateMap();
        }
      }
    });
    safeToQuery = true;
  }
    timerid = setTimeout(function(){update()},1000);
}//clearInterval(timerid) to stop updating.
update();

function updateMap(){
  httpGetAsync(baseurl + "/mapInfo/"+uid, function(response){
    var resp = JSON.parse(response);
    for(var i=0; i<resp.length;i++){
      //Call lauren's thing
      //assuming this is lauren's thing
      updatePlayer(resp[i].name, resp[i].ring);
    }
  });
}

function trashTalk(msg){
  httpGetAsync(baseurl + "/trashTalk/"+msg, function(response){

  });
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
	ring = 0;
    }
  }
)}



jQuery(function($, undefined) {
  $('#terminal').terminal(function(command, term) {

    if (command !== '') {
      command = command.trim();

      var firstWord = "NA";
      var firstBound = command.indexOf(" ");
      if(firstBound != -1){
        firstWord = command.substring(0,firstBound);
      }
      if(firstWord == "trash"){
        trashTalk(command.substring(firstBound,command.length));
      }

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
