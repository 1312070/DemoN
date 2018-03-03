var request = require('request');

var data;

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('home', {flag: 0});
	});

	app.get('/getdata', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			res.render('home', {data: data, flag: 1});
		});
	});

	app.get('/getpost/:id', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			res.render('post', {post: data[req.params.id - 1]});
		});
	});
};
