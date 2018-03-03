var express = require('express');
var bodyParser = require('body-parser');
var homeController = require('./controllers/homeController');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('./public'));

homeController(app);

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Server is listening on port 3000...');
});