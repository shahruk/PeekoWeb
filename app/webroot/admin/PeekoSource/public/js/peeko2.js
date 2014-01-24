window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
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
				//window.location.href = "feed.html";
			}
		});
	});

	FB.Event.subscribe('auth.logout', function(response) {
		  //alert('auth.logout event');
		   });

	FB.Event.subscribe('auth.sessionChange', function(response) {
		  // alert('auth.sessionChange event');
		   });

	FB.Event.subscribe('auth.statusChange', function(response) {
		  // alert('auth.statusChange event');
		   });

	/*function getSession() {
	alert("session: " + JSON.stringify(FB.getSession()));
	}
	*/
}catch(e){

}

function getLoginStatus() {
FB.getLoginStatus(function(response) {
		  if (response.status == 'connected') {
		  } else {
			alert(response.status);
		  }
		  });
}
var friendIDs = [];
var fdata;
function me() {
FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
if (response.error) {
alert(JSON.stringify(response.error));
} else {
//var data = document.getElementById('data');
				   fdata=response.data;
				   console.log("fdata: "+fdata);
response.data.forEach(function(item) {
					/* var d = document.createElement('div');
					 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
					 data.appendChild(d); */
					 });
}
				var friends = response.data;
				console.log(friends.length); 
				for (var k = 0; k < friends.length && k < 200; k++) {
				var friend = friends[k];
				var index = 1;

				friendIDs[k] = friend.id;
				//friendsInfo[k] = friend;
				}
				console.log("friendId's: "+friendIDs);
});
}

function logout() {
	FB.logout(function(response) {
		alert('logged out');
	});
}

function facebookWallPost() {
	console.log('Debug 1');
		var params = {
			method: 'feed',
			name: 'Facebook Dialogs',
			link: 'https://developers.facebook.com/docs/reference/dialogs/',
			picture: 'http://fbrell.com/f8.jpg',
			caption: 'Reference Documentation',
			description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
		  };
		console.log(params);
	FB.ui(params, function(obj) { console.log(obj);});
}

function publishStoryFriend() {
	randNum = Math.floor ( Math.random() * friendIDs.length ); 

	var friendID = friendIDs[randNum];
	if (friendID == undefined){
			alert('please click the me button to get a list of friends first');
	}else{
		console.log("friend id: " + friendID );
		console.log('Opening a dialog for friendID: ', friendID);
		var params = {
				method: 'feed',
			to: friendID.toString(),
			name: 'Facebook Dialogs',
			link: 'https://developers.facebook.com/docs/reference/dialogs/',
			picture: 'http://fbrell.com/f8.jpg',
			caption: 'Reference Documentation',
			description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
			 };
				FB.ui(params, function(obj) { console.log(obj);});
	}
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
	$("#map").click(function(e){
		e.preventDefault();
		$("iframe").attr("src","map.html");
	});
	
	$("#back").click(function(e){
		e.preventDefault();
		$("iframe").attr("src","feed.html");
	});
	
	$("iframe").load(function(){
		//alert(this.contentWindow.location);
	});
});

