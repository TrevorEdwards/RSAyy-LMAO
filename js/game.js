var game = new Phaser.Game(1024, 800, Phaser.CANVAS, 'container', { preload: preload, create: create, update: update, render:render });


function preload() {
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
var pointData = new Map(); //Maps player with a point
var playerColors = new Map();
var levelNames = [];
var activeTexts = [];
var rotAng = 0;


// Update a player with its ring
function updatePlayer(name, ring){
	var ply = playerData.get(name);
	if (ply != undefined){
		movePoint(pointData.get(name),ring);
		playerData.set(name, ring);
	} else{
		var col = playerColors.get(name);
		if( col == undefined){
			playerColors.set(name,randomColorString());
		}
		playerData.set(name,ring);
		renderOne(name,ring);
	}
}

function randomColorString(){
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function renderOne(name, ring){
	var current_angle = Math.random() * 360;
	var wr = largestRadius / (ring + 1);
	var r = Math.random() * 200 + largestRadius * 2;
	var y = game.world.centerY;
	var x = game.world.centerX;
		var point = new Phaser.Point(x+(r*Math.cos(current_angle)), y+(r*Math.sin(current_angle)));
			point.nx = x;
			point.ny = y;
			point.nr = r;
			point.wr = r;
			point.cang = current_angle;
			point.color = playerColors.get(name);
			pointData.set(name, point);
		activePoints.push(point);

		var txt = game.add.text(point.x+25*Math.cos(current_angle) -25,point.y+25*Math.sin(current_angle) -25, name, { fontSize: '8px', fill: playerColors.get(name)  });
		activeTexts.push( txt );
		point.txt = txt;

}

// Renders all players into circles
function renderAll(){
	//Kill ALL the previous points
	for(i = 0; i < activePoints.length; i++){
		//TODO: kill point using a phaser method
	}
	activeTexts.forEach(function(x){
		x.destroy();
	})
	activePoints = [];
	var levels = [];
	for(var i = 0; i < circleCount; i++){
		levels[i] = 0;
		levelNames[i] = [];
	}
	playerData.forEach(function(value,key){
		levels[value]++;
		levelNames[value].push(key);
	});
	//Now we have the number of points per level, time to render
	for(i=0;i<levels.length;i++){
			renderN(levels[i],game.world.centerX,game.world.centerY, largestRadius / (i+1), i );
	}
}

//Returns a random color WOOOOO
function randomColor(){
	var rand = Math.random() * 9999999999;
	return rand;
}

function createCircles(){
	draw_shell.destroy();
	draw_shell = game.add.graphics(0, 0);
	for(var i=1; i<=circleCount; i++){
		draw_shell.lineStyle(1, randomColor(), 1);
		draw_shell.drawCircle(game.world.centerX,game.world.centerY, largestRadius / i);
	}
}

function create() {

	//testtext = game.add.text(16, 16, 'Test', { fontSize: '32px', fill: '#000' });

	shells = game.add.group();

	//Creates circles for levels

	//Allows points to be drawn
	bmap = game.add.bitmapData(game.width, game.height);
    //bmap.addToWorld();

    //Draws circles for levels
	draw_shell = game.add.graphics(0, 0);
	draw_shell.lineStyle(1, 0xff0000, 1);

	//center it
	game.stage.scale.pageAlignHorizontally = true;
	game.stage.scale.pageAlignVeritcally = true;
	//game.stage.scale.refresh();
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}

//Renders N points around point X,Y with radius R, circle c
function renderN(n,x,y,r,c){
	if( n == 0 ) return;

	var angle_divisions = (360/n)*(Math.PI/180);
	var x_pos = game.world.centerX+75;
	var y_pos = game.world.centerY+75;
	var current_angle = 0;

	for (i=0;i<n;i++){
		var point = new Phaser.Point(x+(r*Math.cos(current_angle)), y+(r*Math.sin(current_angle)));
			point.nx = x;
			point.ny = y;
			point.nr = r;
			point.wr = r;
			point.cang = current_angle;
			point.color = playerColors.get(levelNames[c][i]);
			pointData.set(levelNames[c][i], point);
		activePoints.push(point);

		var txt = game.add.text(point.x+25*Math.cos(current_angle) -25,point.y+25*Math.sin(current_angle) -25, levelNames[c][i], { fontSize: '8px', fill: playerColors.get(levelNames[c][i])  });
		activeTexts.push( txt );
		point.txt = txt;
		current_angle += angle_divisions;
	}

}

function update() {
	rotAng = rotAng + .001;
	rotAng = rotAng % 360;

	for(var i = 0; i < activePoints.length; i++){
		var pt = activePoints[i];
		pt.x = pt.nx+(pt.nr*Math.cos(pt.cang + rotAng));
		pt.y = pt.ny+(pt.nr*Math.sin(pt.cang + rotAng));
		pt.txt.x = pt.x+25*Math.cos(pt.cang) -25;
		pt.txt.y = pt.y+25*Math.sin(pt.cang) -25;
		if (pt.wr < pt.nr){
			pt.nr--;
		}
	}
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
		game.context.fillStyle = point.color;
		game.context.fillRect(point.x - pointRadius / 2, point.y - pointRadius/2, pointRadius, pointRadius);
	}
}

function movePoint(point, ring){
	var radius = largestRadius/(ring+1);
	point.wr = radius;
	//largestradius/ (ring+1)

}
