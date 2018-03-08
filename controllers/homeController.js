var request = require('request');
var find = require('arraysearch').Finder;

var data, numPage, firstIndex, endIndex;

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
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			firstIndex = 0;
			if (parseInt(data.length % 6) == 0){
				numPage = parseInt(data.length / 6);
			} else {
				numPage = parseInt(data.length / 6) + 1;
			}
			if (firstIndex + 6 <= data.length){
				endIndex = firstIndex + 6;
			} else {
				endIndex = data.length;
			}
			let result = [];
			for (let i = 0; i < endIndex; i++) {
				result.push(data[i]);
			}
			res.render('home', {data: result, numPage: numPage, pageId: 1, keyword: null});
		});
	});

	app.get('/getpost/:id', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			var post1 = data.find(post => post.id == req.params.id );
			res.render('post', {post: post1});
		});
	});

	app.get('/getposts/:keyword', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			var posts = data.filter(
				post => post.id == req.params.keyword || 
				post.name.toUpperCase().search(req.params.keyword.toUpperCase()) != -1);
			firstIndex = 0;
			if (parseInt(posts.length % 6) == 0){
				numPage = parseInt(posts.length / 6);
			} else {
				numPage = parseInt(posts.length / 6) + 1;
			}

			if (firstIndex + 6 <= posts.length){
				endIndex = firstIndex + 6;
			} else {
				endIndex = posts.length;
			}

			let result = [];
			for (let i = 0; i < endIndex; i++) {
				result.push(posts[i]);
			}
			res.render('home', {data: result, numPage: numPage, pageId: 1, keyword: req.params.keyword});
		});
	});

	app.get('/page/:pageId/:keyword?', function(req, res){
		if (req.params.keyword == null) {
			request('https://api.punkapi.com/v2/beers', function(err, response, body){
				data = JSON.parse(body);
				firstIndex = (req.params.pageId - 1) * 6;
				
				if (parseInt(data.length % 6) == 0){
					numPage = parseInt(data.length / 6);
				} else {
					numPage = parseInt(data.length / 6) + 1;
				}
				
				if (firstIndex + 6 <= data.length){
					endIndex = firstIndex + 6;
				} else {
					endIndex = data.length;
				}
				
				let result = [];
				for (let i = firstIndex; i < endIndex; i++) {
					result.push(data[i]);
				}

				res.render('home', {data: result, numPage: numPage, pageId: req.params.pageId, keyword: req.params.keyword});
			});
		}
		else {
			request('https://api.punkapi.com/v2/beers', function(err, response, body){
				data = JSON.parse(body);
				var posts = data.filter(
					post => post.id == req.params.keyword || 
					post.name.toUpperCase().search(req.params.keyword.toUpperCase()) != -1);
				firstIndex = (req.params.pageId - 1) * 6;
				if (parseInt(data.length % 6) == 0){
					numPage = parseInt(data.length / 6);
				} else {
					numPage = parseInt(data.length / 6) + 1;
				}

				if (firstIndex + 6 <= data.length){
					endIndex = firstIndex + 6;
				} else {
					endIndex = data.length;
				}

				let result = [];
				for (let i = firstIndex; i < endIndex; i++) {
					result.push(data[i]);
				}
				res.render('home', {data: result, numPage: numPage, pageId: req.params.pageId, keyword: req.params.keyword});
			});
		}
	});

	app.get('/sortAZ', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			data.sort(compareAZ);
			res.render('sort', {data: data});
		});
	});

	app.get('/sortZA', function(req, res){
		request('https://api.punkapi.com/v2/beers', function(err, response, body){
			data = JSON.parse(body);
			data.sort(compareZA);
			res.render('sort', {data: data});
		});
	});
};
