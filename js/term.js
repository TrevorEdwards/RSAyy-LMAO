jQuery(function($, undefined) {
$('#terminal').terminal(function(command, term) {
    if (command !== '') {

			command = command.trim();
			var custecho = function(arg){
				term.echo(arg);
			}

		switch(command){
			case 'help':custecho('about: see who I am \nemail: contact me (I\'d love to hear from you!) \ngithub: see my github page \nlinkedin: see my linkedin page \nproject: learn about my past projects \nworkshop: see my steam workshop projects');
				break;
			case 'about': custecho('I\'m a junior at Cornell University. I study Computer Science and will minor in Electrical and Computer Engineering.');
				break;
			case 'project': custecho('A few of my personal projects are \nbig_red_app\nred_events\nmaster_speech\nleap_theremin\nlabyrinth\nmelons2melons\nType project [project_name] to find out more!');
				break;
			case 'email': custecho('I would love to hear from you! You can contact me at trevedwa@gmail.com');
				break;
			case 'github': custecho('Check out my github at https://github.com/TrevorEdwards');
				break;
			case 'linkedin': custecho('View my LinkedIn at https://www.linkedin.com/in/trevedwards');
				break;
			case 'workshop': custecho('I modded games in high school. See my favorites on my Steam Workshop: http://steamcommunity.com/id/tb002/myworkshopfiles/');
				break;
			case 'project big_red_app': custecho('I maintain an open source Android app for Cornell students, and now I own the repository for it!  See it here: https://github.com/TrevorEdwards/bigredapp-android');
				break;
			case 'project red_events': custecho('I needed a back end for Big Red App, so I created the RedEvents API.  See it here: https://github.com/TrevorEdwards/RedEvents');
				break;
			case 'project master_speech': custecho('We made a speech-practicing app at BrickHack 2015.  Check it out: http://devpost.com/software/master-speech');
				break;
			case 'project leap_theremin': custecho('We made a theremin using a leap motion at my first hackathon, HackBU.  Take a look: http://devpost.com/software/leap-theremin');
				break;
			case 'project labyrinth': custecho('One of my mods from high school: players try to escape a maze inhabited by minotaurs.  See it here: https://steamcommunity.com/sharedfiles/filedetails/?id=233263749');
				break;
			case 'project melons2melons': custecho('What if you could play pictionary in 3d?  That\'s what I set out to make here: https://steamcommunity.com/sharedfiles/filedetails/?id=173087050');
				break;
			
			
			default:
				try{
					var result = window.eval(command);
					if (result !== undefined) {
						term.echo(new String(result));
					}
				} catch(e) {
					term.echo('Unrecognized command. Type help or spam your tab key.');
				}
				break;
		}
    } else {
       term.echo('');
    }
	}, {
		greetings: function(callback){
			const greet = 'Welcome to Trevor\'s Personal Site!  Type help for commands.';
			callback(greet);
		},
    name: 'TrevorTerminal', //not necessary
    height: 200,
    width: 800,
    prompt: '\u27B3 '});
});

