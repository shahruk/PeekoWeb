
var serverUrl = window.localStorage.getItem('serverUrl');
var returningUser = window.localStorage.getItem('userid');
if(returningUser){
	//window.location.href = "feed.html";
}

setTimeout(function(){window.location.href="feed.html";},333000);
$(function(){

	$("#register").click(function(e){
		e.preventDefault();
		$("form").slideUp();
		$("#registerForm").stop(true,true).slideDown();
		/*if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			$("#registerForm").slideDown();
		}else{
			window.location.href = "feed.html";
		}*/
	});
	
	$("#login").click(function(e){
		e.preventDefault();
		$("form").slideUp();
		$("#loginForm").stop(true,true).slideDown();
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
	
	$("#registerForm").submit(function(e){
		console.log(e);
		e.preventDefault();
	});
});

