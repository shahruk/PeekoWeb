$(function(){
	$("#facebookLogin").on('click', function(e){
		try{
			e.preventDefault();
			FB.login(null, {scope: 'email'});
		}catch(e){
			alert(e);
		}
	});
	document.addEventListener('deviceready', 
	function(){
		try{
			FB.init({ appId: "619753521393388", nativeInterface: CDV.FB, useCachedDialogs: false });
		}catch(e){
			alert(e);
		}
	}, false);
});