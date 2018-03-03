$(document).ready(function(){
	$('.btn-default').on('click', function(){
		var id = this.id;
		var urll = '/getpost/' + id;
		this.setAttribute("href",urll);
	})
});