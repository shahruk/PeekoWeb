var returningUser = window.localStorage.getItem('fbid');
if(returningUser){
	window.location.href = "start.html";
}
FB.Event.subscribe('auth.login', function(response) {
	//alert(response.authResponse.userID);
	//alert(response.authResponse.accessToken);
	$.ajax({
		url: serverUrl+'/fbregister/'+response.authResponse.userID+'/'+response.authResponse.accessToken,
		success: function(results){
			window.localStorage.setItem('userid',results.userid);
			window.localStorage.setItem('fbid',response.authResponse.userID);
			window.localStorage.setItem('accessToken',response.authResponse.accessToken);
			//window.location.href = "feed.html";
		}
	});
});

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
			//alert('Device is ready! Make sure you set your app_id below this alert.');
			FB.init({ appId: "474482682656477", nativeInterface: CDV.FB, useCachedDialogs: false });
			//document.getElementById('data').innerHTML = "";
		}catch (e){
			alert(e);
		}
	}, false);
	
	$("#facebookLogin").click(function(e){
		e.preventDefault();
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			login();
			window.location.href = "start.html";
		}else{
			window.location.href = "start.html";
		}
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
});

