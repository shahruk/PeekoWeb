window.onerror = function(message, url, lineNumber) {
	alert("Error: "+message+" in "+url+" at line "+lineNumber);
}

window.localStorage.setItem('serverUrl','http://direct.peekoapp.com:8080/');
var serverUrl = window.localStorage.getItem('serverUrl');
window.localStorage.setItem('userid','52dffc0eda70a3b82f1ae1dc');
try{
	FB.Event.subscribe('auth.login', function(response) {
		//alert(response.authResponse.userID);
		//alert(response.authResponse.accessToken);
		$.ajax({
			url: serverUrl+'/fbregister/'+response.authResponse.userID+'/'+response.authResponse.accessToken,
			success: function(results){
				window.localStorage.setItem('userid',results.userid);
				window.localStorage.setItem('fbid',response.authResponse.userID);
				window.localStorage.setItem('accessToken',response.authResponse.accessToken);
				window.location.href = "feed.html";
			}
		});
	});

}catch(e){

}

function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
		} else {
			alert(response.status);
		}
	});

function logout() {
	FB.logout(function(response) {
	});
}

document.addEventListener('deviceready', function() {
	try{	
		//alert('Device is ready! Make sure you set your app_id below this alert.');
		FB.init({ appId: "474482682656477", nativeInterface: CDV.FB, useCachedDialogs: false });
		//document.getElementById('data').innerHTML = "";
	}catch (e){
		alert(e);
	}
}, false);

$(function(){
	viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=400, user-scalable=0');
	$("#map").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
	
	$("#back").click(function(e){
		e.preventDefault();
		window.location.href = "feed.html";
	});

});

