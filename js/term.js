var baseurl = "http://rsalmao.azurewebsites.net";
var gamestate = 0;
var uid = 0;
var ring = 0;
var timerid = null;
var gid = 0;
var mid = 0;
var safeToQuery = true;
var puzzles = [];
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
function update(term){
  if(safeToQuery){
    safeToQuery = false;
    httpGetAsync(baseurl + "/gameStatus/"+mid+"/"+gid, function(response){
      var resp = JSON.parse(response);
      //TRASH TALK @#(*$&@#*($))
      console.log(resp.msg);
      if(resp.msg != lastTrash && resp.msp != undefined){
        lastTrash = resp.msg;
        responsiveVoice.speak(lastTrash);
      }
      if (resp.winner){
        //SOMEONE WON WOW
        term.echo('wow someone won');
      } else {
        if(mid < resp.gMapNumber){
          //we're out of date
          updateMap(term);
        }
      }
    });
    safeToQuery = true;
  }
  timerid = setTimeout(function(){update(term)},1000);
}//clearInterval(timerid) to stop updating.


function updateMap(term){
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
  httpGetAsync(baseurl + "/trashTalk/"+msg.trim(), function(response){

  });
}


function getPuzzleInfo(term, n){
  httpGetAsync(baseurl + "/puzzleInfo/" + uid + '/' + n, function(response){
    var obj = JSON.parse(response);
    puzzles[n] =  obj.prompt;
    term.echo("Puzzle "+n+ " is: " + puzzles[n]);
  })};



  function joinGame(term,name){
    var frag = '/joingame/'
    var url = baseurl.concat(frag).concat(name);
    httpGetAsync(url,function(callback){
      if(callback == ""){
        term.echo("That name is already taken. Choose another.")
      }
      else{
        term.echo("Welcome, %s.", name);
        var obj = JSON.parse(callback);
        uid = obj.uid;
        gamestate = 1;
        ring = 0;
        update(term);
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
          return;
        }

        if(gamestate == 0){
          joinGame(term , command);
        }
        else{
          var first = command.split[' '][0];
          var rest = command.substr(first.length + 1);

          switch(first){
            case help: term.echo("Type in the answer to the problem to proceed");
            break;

            case solve:
            var frag = '/solution/';
            var url = baseurl.concat(frag).concat(name).concat('/').concat(command);
            httpGetAsync(url,function(callback){
              var obj = JSON.parse(callback)
              if(obj.correct){
                term.echo("Good job son, you got it correct.");
                moveOn();
              }
              else{
                term.echo("Wrong answer, try again");
              }
            })
            break;
            case repeat:







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
