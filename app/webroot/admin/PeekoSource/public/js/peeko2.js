window.onerror = function(message, url, lineNumber) {
	alert("Error: "+message+" in "+url+" at line "+lineNumber);
}

window.localStorage.setItem('serverUrl','http://direct.peekoapp.com:8080/');
var serverUrl = window.localStorage.getItem('serverUrl');
try{
/*
	FB.Event.subscribe('auth.login', function(response) {
		//alert(response.authResponse.userID);
		//alert(response.authResponse.accessToken);
		$.ajax({
			url: serverUrl+'/fbregister/'+response.authResponse.userID+'/'+response.authResponse.accessToken,
			success: function(results){
				window.localStorage.setItem('userid',results.userid);
				window.localStorage.setItem('fbid',response.authResponse.userID);
				window.localStorage.setItem('accessToken',response.authResponse.accessToken);
				window.location.href = "feed.html";
			}
		});
	});
*/
}catch(e){

}

document.addEventListener('deviceready', function() {
	try{	
	}catch (e){
		alert(e);
	}
}, false);

$(function(){
	viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=400, user-scalable=0');
	
	$("#map").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
	
	$("#home").click(function(e){
		e.preventDefault();
		window.location.href = "feed.html";
	});

});

