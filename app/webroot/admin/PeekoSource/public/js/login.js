var returningUser = window.localStorage.getItem('fbid');
if(returningUser){
	window.location.href = "start.html";
}

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

document.addEventListener('deviceready', function() {
	try{
		//alert('Device is ready! Make sure you set your app_id below this alert.');
		FB.init({ appId: "474482682656477", nativeInterface: CDV.FB, useCachedDialogs: false });
		//document.getElementById('data').innerHTML = "";
	}catch (e){
		alert(e);
	}
}, false);