var express = require('express'),
    game = require('game'),
    app = express(),
    http = require('http');

var server_port = 8080 //process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = 127.0.0.1 //process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('port', server_port);
app.set('ip', server_ip_address);


// app.get('/', createIndex); //Index
// app.get('/events', events.findAll);
// app.get('/events/:end', events.findRange);
// app.get('/events/:begin/:end', events.findRangeExclusive);
// app.get('/contacts', contacts.findAll);
// app.get('/libraries', libraries.findAll);
// app.get('/academiccalendar', academiccalendar.findAll);

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("RSALmao server listening at %s:%d ", app.get('ip'),app.get('port'));
});



//DEBUG
// process.on('uncaughtException', function (err) {
//     console.log(err);
// });
