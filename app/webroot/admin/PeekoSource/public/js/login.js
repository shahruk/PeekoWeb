$(function(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
	
	function onDeviceReady(){
		try{
			alert('Device is ready! Make sure you set your app_id below this alert.');
			FB.init({ appId: "appid", nativeInterface: CDV.FB, useCachedDialogs: false });
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