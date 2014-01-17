$(function(){
	$("#facebookLogin").on('click', function(e){
		try{
			e.preventDefault();
			FB.login(function(response) {
				if (response.authResponse) {
					console.log('Welcome!  Fetching your information.... ');
					FB.api('/me', function(response) {
						alert	('Good to see you, ' + response.name + '.');
					});
				} else {
					alert('User cancelled login or did not fully authorize.');
				}
			}, {scope: 'email'});
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