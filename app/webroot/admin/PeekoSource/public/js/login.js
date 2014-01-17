$(function(){
	$("#facebookLogin").on('click', function(e){
		e.preventDefault();
		FB.login(null, {scope: 'email'});
	});
});