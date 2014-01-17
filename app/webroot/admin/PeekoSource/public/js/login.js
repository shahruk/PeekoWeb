$(function(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
	
	function onDeviceReady(){
		try{
			FB.init({ appId: "619753521393388", nativeInterface: CDV.FB, useCachedDialogs: false });
		}catch(e){
			alert(e);
		}
	}
	
	
	$("#facebookLogin").on("click", function(e){
		try{
			alert("A");
			e.preventDefault();
			FB.login(function(response) {
				alert("WE HAVE A RESPONSE!");
				if (response.authResponse) {
					alert('Welcome!  Fetching your information.... ');
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
});