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
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			login();
		}else{
			window.location.href = "feed.html";
		}
	});
	
	$("#continueGuest").click(function(e){
		$("iframe", parent.document).attr('src', 'map.html');
	});
	
	$("#map").click(function(e){
		e.preventDefault();
		$("iframe", parent.document).attr('src', 'map.html');
	});
});