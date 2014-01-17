$(function(){
	$("#facebookLogin").on('click', function(e){
		e.preventDefault();
		alert("A");
		FB.login(null, {scope: 'email'});
	});
});