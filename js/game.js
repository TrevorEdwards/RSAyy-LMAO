var game = new Phaser.Game(1024, 800, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render:render });

function preload() {
	//game.load.spritesheet('background', 'assets/BackgroundTest.png', 800, 600);
	//game.load.image('background', 'assets/BackgroundTest.png');
	//game.load.image('background', 'assets/background.png');
}

//var = background;
var testtext;
var shell;
var draw_shell;
var in_shell = [];
var mid_shell = [];
var out_shell = [];
var activePoints = [];

var largestRadius = 300;
var pointRadius = 8;
var circleCount = 3;
var playerData = new Map(); //Maps player names to their rings.. not really useful yet




// Update a player with its ring
function updatePlayer(name, ring){
	var ply = playerData.get(name);
	if( !( ply && ply == ring )){
		playerData.set(name,ring);
		renderAll();
	}
}

// Renders all players into circles
function renderAll(){
	//Kill ALL the previous points
	for(i = 0; i < activePoints.length; i++){
		//TODO: kill point using a phaser method
	}
	activePoints = [];
	var levels = [];
	for(var i = 0; i < circleCount; i++){
		levels[i] = 0;
	}
	playerData.forEach(function(value,key){
		levels[value]++;
	});
	//Now we have the number of points per level, time to render
	for(i=0;i<levels.length;i++){
			renderN(levels[i],game.world.centerX,game.world.centerY, largestRadius / (i+1) );
	}
}

//Returns a random color WOOOOO
function randomColor(){
	var rand = Math.random() * 9999999999;
	return rand;
}

function create() {

	game.add.sprite(0, 0, 'background');

	testtext = game.add.text(16, 16, 'Test', { fontSize: '32px', fill: '#000' });

	shells = game.add.group();

	//Creates circles for levels

	//Allows points to be drawn
	bmap = game.add.bitmapData(game.width, game.height);
    //bmap.addToWorld();

    //Draws circles for levels
	draw_shell = game.add.graphics(0, 0);
	draw_shell.lineStyle(1, 0xff0000, 1);

	for(var i=1; i<=circleCount; i++){
		draw_shell.lineStyle(1, randomColor(), 1);
		draw_shell.drawCircle(game.world.centerX,game.world.centerY, largestRadius / i);
	}

	//TEST data
	updatePlayer('Trevor',2);
	updatePlayer('Lauren',2);
	updatePlayer('Jerry',1);
	updatePlayer('Henry',0);
	//END OF TEST DATA



}

//Renders N points around point X,Y with radius R
function renderN(n,x,y,r){

	if( n == 0 ) return;

	var angle_divisions = (360/n)*(Math.PI/180);
	var x_pos = game.world.centerX+75;
	var y_pos = game.world.centerY+75;
	var current_angle = 0;

	for (i=0;i<n;i++){
		activePoints.push(new Phaser.Point(x+(r*Math.cos(current_angle)), y+(r*Math.sin(current_angle))));
		current_angle += angle_divisions;
	}

}

function update() {


    //Create group of points for each circle

    //--Populate outer shell--
    //Get size of outer shell group
    //Calc angle divisions
    //For each point in shell
    ////Adjust coordinates of point

    //Change Point's Shell Location
    //Get current position/parent
    //Move point based on current group
    //If point moving past last shell
    ////End game



}

function render() {

	for(i=0;i<activePoints.length;i++){
		point = activePoints[i];
		game.context.fillStyle = 'rgb(255,255,0)';
		game.context.fillRect(point.x, point.y, 4, 4);
	}
}

function changePosition(){

}
