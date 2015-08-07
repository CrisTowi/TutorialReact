var express = require('express');

var app = express();

app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use('/static', express.static('public'));

app.get('/', function(req, res){
	res.render('tutorial1');
});

var server = app.listen(3000, function() {
	console.log('Escuchando en el puerto 3000');
});