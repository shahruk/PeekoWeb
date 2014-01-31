window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}

var returningUser = window.localStorage.getItem('userid');
if(returningUser){
	//window.location.href = "feed.html";
}


$(function(){
	
	$("#register").click(function(e){
		e.preventDefault();
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			register();
		}else{
			window.location.href = "feed.html";
		}
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
});

