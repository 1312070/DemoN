var request = require('request');

var data;

function compareAZ(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

function compareZA(a,b) {
  if (a.name > b.name)
    return -1;
  if (a.name < b.name)
    return 1;
  return 0;
}

module.exports = function(app){
	app.get('/', function(req, res){
		var page = 1;
		var total = 26;
		var url = 'https://api.punkapi.com/v2/beers?per_page=9&';
		if (req.query) {
			var query = req.query;
			Object.keys(query).forEach(key => {
				if (query[key]) {
					url = url + key + "=" + query[key] + "&";
					if (key == 'page')
						page = query[key];
				}
			});
		}

		request(url, function(err, response, body){
			data = JSON.parse(body);
			res.render('home', {data: data, page: page, total: total});
		});
	});

	app.get('/getpost/:id', function(req, res){
		var url = 'https://api.punkapi.com/v2/beers/' + req.params.id;
		request(url, function(err, response, body){
			data = JSON.parse(body);
			res.render('post', {post: data});
		});
	});

	app.get('/search', function(req,res){
		var page = 1;
		var total = 26;
		var url = 'https://api.punkapi.com/v2/beers?per_page=9&';
		if (req.query) {
			var query = req.query;
			Object.keys(query).forEach(key => {
				if (query[key]) {
					url = url + key + "=" + query[key] + "&";
					if (key == 'page')
						page = query[key];
				}
			});
		}
		
		request(url, function(err, response, body){
			data = JSON.parse(body);
			res.render('home', {data: data, page: page, total: total});
		});
	})
};
