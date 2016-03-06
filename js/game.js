    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });
    
    function preload () {
	
        game.load.image('logo', 'phaser.png');
	
    }
    
    function create () {
	
        circle = new Phaser.Circle(game.world.centerX, 100,64);
	
    }
    
    function render () {
	
	game.debug.geom(circle,'#cfffff');
	game.debug.text('Diameter : '+circle.diameter,50,200);
	game.debug.text('Circumference : '+circle.circumference(),50,230);
    }


