var baseurl = "http://rsa-lmao.appspot.com";
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
  xmlHttp.timeout = 2000;
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
    httpGetAsync(baseurl + "/gameStatus/"+mid+"/"+gid, function(response){
      var resp = JSON.parse(response);
      //TRASH TALK @#(*$&@#*($))
      if(resp.msg != lastTrash && resp.msg != undefined){
        lastTrash = resp.msg;
        responsiveVoice.speak(lastTrash);
      }
      if (resp.winner){
        alert(resp.winner + ' has won the round!');
        gid = 0;
        mid = 0;
        ring = 0;
        getActiveGame();
        getPuzzleInfo(term, 0);
      } else {
        if(mid < resp.gMapNumber){
          //we're out of date
          updateMap(term);
        }
      }
    });
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

function moveOn(term){
  ring++;
  if(ring <= circleCount){
      getPuzzleInfo(term,ring);
  }
  //win?
}


function getPuzzleInfo(term, n){
  httpGetAsync(baseurl + "/puzzleInfo/" + uid + '/' + n, function(response){
    var obj = JSON.parse(response);
    puzzles[n] =  obj.prompt;
    term.echo("Puzzle "+n+ " is: " + puzzles[n]);
    $('#puzprompt').text(puzzles[n]);
  });
}


function getActiveGame(term){
  httpGetAsync(baseurl+ '/activeGame', function(response){
    var obj = JSON.parse(response);
    gid = obj.gameId;
    circleCount = obj.circleCount + 1;
    createCircles();
  });
}

function joinGame(term,name){
  var frag = '/joingame/'
  var url = baseurl.concat(frag).concat(name);
  httpGetAsync(url,function(callback){
    if(JSON.parse(callback).uid == null){
      term.echo("That name is already taken. Choose another.")
    }
    else{
      term.echo("Welcome, " + name + ". Type puzzle to display the puzzle again. Type solve with your answer to attempt to solve the puzzle.");
      var obj = JSON.parse(callback);
      uid = obj.uid;
      gamestate = 1;
      ring = 0;
      getPuzzleInfo(term,0);
      getActiveGame(term);
      update(term);
    }
  }
)}

function easyRSA(term,args){
  if(args.length != 4 ) {
    term.echo('Proper usage is: message-number p q private-key');
    return;
  }
  httpGetAsync(baseurl + "/easyrsa/"+args[0]+"/"+args[1]+"/"+args[2]+"/"+args[3], function(response){
    var resp = JSON.parse(response);
    term.echo(resp.data);
  });
}



jQuery(function($, undefined) {
  $('#terminal').terminal(function(command, term) {

    if (command !== '') {
      command = command.trim();

      var firstWord = command;
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
        var rest = command.substr(firstWord.length + 1);
        switch(firstWord){
          case "help": term.echo("Provide the answer to the problem to proceed. Type puzzle to display the puzzle again. Type solve with your answer to attempt to solve the puzzle.");
          break;

          case "puzzle": getPuzzleInfo(term,ring);
          break;

          case "solve":
          var frag = '/solution/';
          var url = baseurl.concat(frag).concat(uid).concat('/').concat(rest);
          httpGetAsync(url,function(callback){
            var obj = JSON.parse(callback)
            if(obj.correct){
              term.echo("Good job, you got it correct.");
              moveOn(term);
            }
            else{
              term.echo("Wrong answer, try again.");
            }
          });
          break;

          case "rsayylmao": easyRSA(term, rest.split(' '));
          break;

          default: term.echo("Unknown Command");
          break;

        }
      }
    } else{
      term.echo("");
    }
  },{
    completion: [
			'help',
			'solve',
			'trash',
			'puzzle',
      'rsayylmao',
		],
    outputLimit: 6,
    greetings: function(callback){
      const greet = 'Welcome to the game. Please type your name.';
      callback(greet);
    },
    name: 'TrevorTerminal', //not necessary
    height: 100,
    width: 1001,
    prompt: ''});
  });
