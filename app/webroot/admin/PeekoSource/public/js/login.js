window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}

var returningUser = window.localStorage.getItem('fbid');
if(returningUser){
	window.location.href = "index.html";
}

//For desktop
try{
	FB.Event.subscribe('auth.login', function(response) {
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
}catch(e){}

function login() {
	FB.login(
		function(response) {
			if(!response.authResponse){
				alert("Unfortunately you couldn't be logged in. :(");
			}
		},
		{ scope: "email" }
	);
}

$(function(){
	document.addEventListener('deviceready', function() {
		try{
			FB.init({ appId: "474482682656477", nativeInterface: CDV.FB, useCachedDialogs: false });
		}catch (e){
			alert(e);
		}
	}, false);
	
	$("#facebookLogin").click(function(e){
		e.preventDefault();
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			login();
		}else{
			window.location.href = "start.html";
		}
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
});

