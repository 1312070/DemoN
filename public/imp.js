$(document).ready(function(){
	$('.see-more').on('click', function(){
		let id = this.id;
		let urll = '/getpost/' + id;
		this.setAttribute("href",urll);
	});

	$('#pagination-here').bootpag({
	    total: 26,          
	    page: 1,            
	    maxVisible: 5,     
	    leaps: true,
	});

	$('#pagination-here').on("page", function(event, num){
		//event.preventDefault()
	    //show / hide content or pull via ajax etc
	    var urll = 'https://api.punkapi.com/v2/beers?per_page=9&';
	    var param = window.location.search.slice(1).split("&");
	    for (let i = 0; i < param.length; i++){
	    	var delimiteIndex = param[i].indexOf("=");
	    	var key = param[i].substr(0, delimiteIndex);
	    	var value = param[i].substr(delimiteIndex + 1);
	    	if (value) {
	    		urll = urll + key + '=' + value + "&";
	    	}
	    }
	    urll = urll + "page=" + num;
	    //this.setAttribute("href", urll);
	    $.ajax({
	    	type: 'GET',
	    	url: urll,
	    	dataType: 'json',
	    	success: function(data){
	    		console.log(data);
	    		$("#content").html('<%- include partials/content.ejs %>');
	    	},
	    	error: function(err){
	    		alert(this.url);
	    	}
	    });
	    
	});
	
});