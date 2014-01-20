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
	var parent = window.parent.document.body;
	$("#facebookLogin").click(function(e){
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			login();
		}else{
			$("iframe", parent).attr('src', 'feed.html');
		}
	});
	
	$("#continueGuest").click(function(e){
		$("iframe", parent).attr('src', 'map.html');
	});
	
	$("#map").click(function(e){
		e.preventDefault();
		$("iframe", parent).attr('src', 'map.html');
	});
});