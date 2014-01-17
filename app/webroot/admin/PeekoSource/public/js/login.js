$(function(){
	$("#facebookLogin").on('click', function(e){
		try{
			e.preventDefault();
			FB.login(null, {scope: 'email'});
		}catch(e){
			alert(e);
		}
	});
});