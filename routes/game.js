// //Holds game state.  Make sure to use databases guys.
//var mongodb = require('shareddb'),
var puzzleFactory = require('./puzzleModules/puzzleFactory');
var bigInt = require('big-integer');
// app.get('/puzzleInfo/:uid/:n', game.getPuzzleInfo); //Get info of puzzle n for user uid
// app.get('/mapInfo/:uid', game.getMapInfo); //Get map info for uid.  Sends a map id #
// app.get('/gameStatus/:uid', game.getGameStatus); //Data on whether the game has ended, what the map identifier is for uid
// app.get('/joinGame/:name', game.join); //User wants to join the game with name
// app.get('/solution/:uid/:solution', game.proposeSolution); //User wants to propose a solution for its current puzzle

//IMPORTANT CONSTANTS~~~~~~~~~~~~~~~~~~~~~~~~~
//TODO since some of these could end up in DB.  Feel free to put stuff here though
var gMapNumber = 0; // Update sequence number of map
var gGameNumber = 0; // Game sequence number
var gRingNumber = 2; //Number of normal rings
var gGame = {};
var gPlyN = {}; //All player names
var gSolutions = [];
var gStatus = [];
var gOutputMap = [];
var gWords = ["the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","hot","word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","space","heard","best","hour","better","true .","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave","green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","street","inch","multiply","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible","plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill","east","paint","language","among","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","size","vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","perhaps","pick","sudden","count","square","reason","length","represent","art","subject","region","energy","hunt","probable","bed","brother","egg","ride","cell","believe","fraction","forest","sit","race","window","store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument","kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower","clothe","strange","gone","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held","hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand","soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","ear","else","quite","broke","case","middle","kill","son","lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress","cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease","hole","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean","break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell","fit","flow","fair","bank","collect","save","control","decimal","gentle","woman","captain","practice","separate","difficult","doctor","please","protect","noon","whose","locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","crop","modern","element","hit","student","corner","party","supply","bone","rail","imagine","provide","agree","thus","capital","won't","chair","danger","fruit","rich","thick","soldier","process","operate","guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar","stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print","dead","spot","desert","suit","current","lift","rose","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term","opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop","stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent","oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister","steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening","condition","feed","tool","total","basic","smell","valley","nor","double","seat","arrive","master","track","parent","shore","division","sheet","substance","favor","connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market","degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth","shell","neck"];
var gFinalPuzzleAnswer = [];


//EXPORTS~~~~~~~~~~~~~~
exports.getPuzzleInfo = function(req, res) {

    var uid = req.params.uid;
    var n = Number( req.params.n );

    //check user has credentials to view that prompt
    if (gGame.players.get(uid).ring >= n) {
      //send the prompt
      if( n >= 0){
        res.send({ prompt : gGame.rings[n]});
      }
    } else {
      //Invalid credentials
      console.log(uid + ' tried to access restricted puzzle info');
    }
};

exports.getMapInfo = function(req, res) {

    var uid =  req.params.uid ;
    //Map info isn't user specific for now.
    res.send(gOutputMap);

};

exports.getGameStatus = function(req, res) {

    var uid = req.params.uid;
    var n = Number( req.params.n );

    //game status is uid independent
    res.send(gStatus[n]);


};

exports.join = function(req, res) {

    var name =  req.params.name;

    res.send(addPlayer(name));

};

exports.proposeSolution = function(req, res) {

    var uid = req.params.uid;
    var solution = req.params.n;

    checkAnswer(uid,solution);

};

exports.getActiveGame = function(req, res){
  res.send({ gameId : gGameNumber});
}

//GAME STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
newGame();

function randomWordIndex(){
  return Math.floor(Math.random() * gWords.length);
}

//converts a string of all lowercase to a number-string
function stringToNum(str){
  var outstr = "";
  for(var i = 0; i < str.length; i++){
    var res = str.charCodeAt(i) - 'a'.charCodeAt(0);
    res = "" + res;
    if(res.length == 1){
      res = "0" + res;
    }
    outstr += res;
  }
  return Number(outstr);
}

//converts a num-string to a string wow! NUM MUST BE EVEN LENGTH DOG
function numToString(num){
  var outstr = "";
  for(i = 0; i<num.length;i = i + 2){
    var cut = Number(num[i] + num[i+1]);
    outstr = outstr + String.fromCharCode(cut+65);
  }
  //TODO lol
}

// Starts next round of game
function newGame(ringCount) {
  gMapNumber = 0; // Update sequence number of map
  gGameNumber++; // Game sequence number
  gPlyN = {};
  gOutputMap = [];
  var w1 = randomWordIndex();
  var w2 = randomWordIndex();
  var w3 = randomWordIndex();
  gFinalPuzzleAnswer = [gWords[w1],gWords[w2],gWords[w3]];

  var rSAObj = generateRSAkeys();
  var rings = generateRings();
  var players = new Map();
  //encrypt final answer
  var unencrypted = w1 * 1000000 + w2 * 1000 + w3;
  var finalEncr = toggleEncrypt(unencrypted, rSAObj.pubkey, rSAObj.p, rSAObj.q);



  gGame = {
    rSAObj,
    rings,
    players,
    finalEncr,
  };
}

// Generates RSA, returning an object of p1, p2, n (?)
function generateRSAkeys(){
  var p = 0;
  var q = 0;
  var privkey = 0;
  do {
    p = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(p));
  do {
    q = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(q) || q==p);
  do {
    privkey = Math.floor(Math.random()*(89999) + 10000);
  } while (!isPrime(privkey));
  var phi = (p-1)*(q-1);

  var inverse = function(privkey, phi) {
    var b0 = phi
    var t;
    var q;
    var x0 = 0, x1 = 1;
    if (phi == 1) return 1;
    while (privkey > 1) {
      q = Math.floor(privkey / phi);
      t = phi, phi = privkey % phi, privkey = t;
      t = x0, x0 = x1 - q * x0, x1 = t;
    }
    if (x1 < 0) x1 += b0;
    return x1;
  }

  var pubkey = inverse(privkey, phi);
  return {p:p, q:q, privkey:privkey, pubkey:pubkey};
}

// Creates a list of puzzles representing each ring
function generateRings(ringCount){
  var rings = [];
  for(var i = 0; i < ringCount; i++){
    //Generate the answer
    ans = puzzleAnswer(i);
    //Add a puzzle
    var puzzle = puzzleFactory.getNormalPuzzle();
    rings.push(puzzle.getPrompt(ans));
    gSolutions[i] = ans;
  }
  //Last ring
  var final = puzzleFactory.getFinalPuzzle();
  rings
    .push(final.getPrompt(gGame.finalEncr));
    gSolutions[ringCount] = gFinalPuzzleAnswer;

  return rings;
}

// Returns an object containing the three words that are a puzzle's answer
// Uses the puzzle key
function puzzleAnswer(ringIndex){
  switch(ringIndex) {
    case 0:
      return gGame.rSAObj.p;
      break;
    case 1:
      return gGame.rSAObj.q;
      break;
    case 2:
      return gGame.rSAObj.privkey;
      break;
    default:
      return;
  }
}

//Checks that a given answer is equal to the correct.  Advances the user if so and returns true.
function checkAnswer(uid, ans){
  var ringNum = gGame.players.get(uid).ring;
  for (var i = 0; i < gSolutions[ringNum].length; i++){
    if (gSolutions[ringNum][i] != ans[i]){
      return false;
    }
  }
  advanceUser(uid);
  return(true);
}

// Advances the user in the game
function advanceUser(uid){
  var ringNum = gGame.players.get(uid).ring;
  if (ringNum < gSolutions.length + 1){
    gGame.players.get(uid).ring++;
    incrementMap();
  } else {
    //looks like they won. WOOHOO
    gStatus[gGameNumber] = {
      winner : gGame.players.get(uid).name
    }
    newGame(gRingNumber);
  }
}

// Generates an array of name,ring pairs for data output, stores it to avoid recomp
function incrementMap(){
  gMapNumber++;
  gOutputMap = [];
  console.log(gGame.players.size);
  var i = 0;
  gGame.players.forEach(function(value,key){
    gOutputMap.push({name:value.name,ring:value.ring, });
    i++;
  });

}

//Maps up to three digits to a word
function numToWord(num){
  return gWords[num];
}

//Adds a player to the current game.
//Returns the unique name for the player for 'private' communication
function addPlayer(name){
  if(gPlyN[name]) return null;

  var ply = {};

  var num = "0000" + (Math.floor(Math.random() * 100000)).toString();
  num = num.substring(num.length - 5);
  var uid = name + num;

  ply.uid = uid;
  ply.ring = 0;
  ply.name = name;

      gGame.players.set(uid, ply);
      gPlyN[name] = true;
      incrementMap();
      return uid;

}


function getUsername(uid) {
    if (uidMap.has(uid)) {
        return uidMap.get(uid);
    }
    return "This uid does not exist.";
}

function isPrime(n) {
  if (n==leastFactor(n)) return true;
  return false;
};


function leastFactor(n){
  if (n%2==0) return 2;
  if (n%3==0) return 3;
  if (n%5==0) return 5;
  var m = Math.sqrt(n);
  for (var i=7;i<=m;i+=30) {
    if (n%i==0)      return i;
    if (n%(i+4)==0)  return i+4;
    if (n%(i+6)==0)  return i+6;
    if (n%(i+10)==0) return i+10;
    if (n%(i+12)==0) return i+12;
    if (n%(i+16)==0) return i+16;
    if (n%(i+22)==0) return i+22;
    if (n%(i+24)==0) return i+24;
  }
  return n;
};

function toggleEncrypt(n, key, p, q) {
  return bigInt(n).modPow(key, p*q).toJSNumber();
}
