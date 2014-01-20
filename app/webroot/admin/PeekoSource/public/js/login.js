var returningUser = window.localStorage.getItem('fbid');
if(returningUser){
	window.location.href = "feed.html";
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
			window.location.href = "feed.html";
		}
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
});