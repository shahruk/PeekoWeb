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
			$("iframe").attr('src', 'feed.html');
		}
	});
	
	$("#continueGuest").click(function(e){
		$("iframe").attr('src', 'map.html');
	});
	
	$("#map").click(function(e){
		e.preventDefault();
		$("iframe").attr('src', 'map.html');
	});
});