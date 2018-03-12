$(document).ready(function(){
	$('.see-more').on('click', function(){
		let id = this.id;
		let urll = '/getpost/' + id;
		this.setAttribute("href",urll);
	});

	$('.page').on('click', function(){
		//event.preventDefault()
	    var urll = window.location.pathname + "?";
	    var param = window.location.search.slice(1).split("&");
	    for (let i = 0; i < param.length; i++){
	    	var delimiteIndex = param[i].indexOf("=");
	    	var key = param[i].substr(0, delimiteIndex);
	    	var value = param[i].substr(delimiteIndex + 1);
	    	if (value) {
	    		if (key != 'page')
	    			urll = urll + key + '=' + value + "&";
	    	}
	    }

	    if (urll == "/search?")
	    	urll = "/?";
	    urll = urll + "page=" + this.text;
	    this.setAttribute("href", urll);
	    
	});
	
});