$(document).ready(function(){
	$('.see-more').on('click', function(){
		let id = this.id;
		let urll = '/getpost/' + id;
		this.setAttribute("href",urll);
	});

	$('.search-post').on('click', function(){
		let keyword = $('#searchBar').val();
		let urll = '/getposts/' + keyword;
		this.setAttribute("href", urll);
	});

	$('.page').on('click', function(){
		let pageId = this.text;
		let keyword = $('#searchBar').val() || '';
		let urll = '/page/' + pageId + '/' + keyword;
		this.setAttribute("href", urll);
	});
});