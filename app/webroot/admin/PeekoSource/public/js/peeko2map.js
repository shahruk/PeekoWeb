window.onerror = function(message, url, lineNumber) {
	alert("Error: "+message+" in "+url+" at line "+lineNumber);
}

$(function(){
	
	function startCountdown(){
		var countdown = new Date();
		var targetHour = 1;
		
		//If greater than the time, then do it for tomorrow.
		if(countdown.getHours() >= targetHour){
			if(countdown.getHours() >= 13){
				countdown.setDate(countdown.getDate()+1);
			}else{
				targetHour = 13;
			}
		}
		
		countdown.setHours(targetHour,0,0,0);
		$('.countdown').countdown({until: $.countdown.UTCDate(-5, countdown)}); 
	}
	
	//Push notification
	var pushNotification;
	
	var applaunchCount = window.localStorage.getItem('appLaunchCounter');
	$("body").show();
	//Check if it already exists or not
	if(!applaunchCount){
	  $("body").prepend("<div id='tutorial'><a class='endTutorial btn btn-primary btn-lg' href='#'>Skip Tutorial</a><div id='steps'><div><img src='http://i.imgur.com/qTcG9T2.png' /> <h2>Shop Daily Deals and Selections Near You</h2><div class='description'>Tap the store's logo to browse today's deals and selections. Shop at hundreds of stores like H&M, Forever 21, Best Buy, Starbucks, American Eagle, Macy's, and much more straight from your phone. There's always a new deal or selection to browse from!</div></div><div><img src='http://i.imgur.com/sFRTOkn.png' /> <h2>Shop In Store or Online</h2>Browse reviews, photos, details and more on our selected items. When you see something you like, purchase online or swing by the store and check it out in person.</div></div><a class='endTutorial btn btn-success btn-lg' href='#'>Continue</a></div>");
	  $("body").on('click', '.endTutorial', function(e){
		e.preventDefault();
		$("#tutorial").remove();
		//Local storage is not set, hence first time launch. set the local storage item
		if($(this).text() == "Continue"){
			window.localStorage.setItem('appLaunchCounter',1);
		}
	  });
	  

	  //Do the other stuff related to first time launch
	}

	var serverUrl = "http://direct.peekoapp.com:8080/";
	var markers = [];
	var firstRun = true;
	//var shareHandler;

	var dataHolder;

	var initialCenter = new google.maps.LatLng(40.758895, -73.985131);
	var mapOptions = {
		center: initialCenter,
		zoom: 14,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	var marker = new google.maps.Marker({
		position: initialCenter,
		map: map,
		icon: {
			url: serverUrl+'img/me.png',
			scaledSize: new google.maps.Size(24,28),
			animation: google.maps.Animation.DROP
		},
		zindex: 100
	});

	var userMarker = new google.maps.Marker({
		position: new google.maps.LatLng(120, 60), 
		map: map,
		zindex: 100
	});

	// Wait for device API libraries to load
	//
	document.addEventListener("deviceready", onDeviceReady, false);

	//When device is ready, do onSuccess.
	function onDeviceReady(){
		getLocation();
		try{
			pushNotification = window.plugins.pushNotification;
			//pushNotification.register(function(result){ alert(result); }, function(error){alert(error); }, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
		}catch(e){
			//alert('Error: '+e);
		}
	}

	function getLocation(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000, timeout: 3000, enableHighAccuracy: true});
		//navigator.geolocation.getCurrentPosition(onSuccess);
	}

	function onSuccess(position){
		try{
			centerMap(position.coords.latitude, position.coords.longitude, firstRun);
			if(firstRun){
				firstRun = false;
			}
		}catch(error){
			alert(error);
		}
	}

	function onError(error) {
		navigator.geolocation.getCurrentPosition(onSuccess, function(){
			alert(error.code + " " +error.message);
			alert("Unfortunately it looks like you're not connected. You will need to have internet access and allow us to use your location for Peeko to work.");
		});
		
	}

	//Show an overlay.
	function showOverlay(marker, data, name){
		dataHolder = data;
		startCountdown();
		$("#productOverlay").fadeIn(400);	
		$("#productOverlay").html("<div class='block'><div class='brand clearfix'><div class='countdownContainer'><span class='fa fa-clock-o'></span><div class='countdown'></div></div><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+data.icon+"\");' class='logo'></div><div class='brandname'>"+name+"</div></div><div><img data-url='"+data.url+"' class='blockImage' src='"+data.images+"'><h3>"+data.name+"</h3><h5>"+data.price+"</h5><div class='description'>"+data.description+"</div></div><div class='actions' data-id='"+data.id+"'><div class='favorite'><span class='fa fa-heart'></span></div><div class='visit' data-url='"+data.url+"'><span class='fa fa-external-link'></span></div><div class='share' data-url='http://peekoapp.com/blocks/"+data.number+"/"+data.permalink+"' data-description='Find more deals and selections at stores near you with www.peekoapp.com' data-title='Shopping via Peeko (http://peekoapp.com)'><span class='fa fa-share'></span></div></div></div>");
		
		//Need above line because productOverlay constantly reset
		startCountdown();
	}

	//Add a marker
	function addMarker(longitude, latitude, data){
		var tmpMarker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			icon: {
				url: serverUrl+'brands/'+data.active_block['icon'],
				scaledSize: new google.maps.Size(55,70),
				zIndex: 1,
			}
		});
		google.maps.event.addListener(tmpMarker, 'click', function() { 
			if(tmpMarker.getZIndex() != 10){
				for(i = 0; i < markers.length; i++){
					markers[i].setZIndex(1);
				}
				 tmpMarker.setZIndex(10);
			}
			showOverlay(tmpMarker, data['active_block'], data.name);
		});

		markers.push(tmpMarker);
	}

	function centerMap(latitude, longitude, moveMap){
		var geo = new google.maps.LatLng(latitude, longitude);
		if(moveMap){
			map.setCenter(geo);
			marker.setPosition(geo);
		}else{
			//map.setZoom(15);
		}
		$.ajax({
			url: serverUrl+'blocks/'+longitude+'/'+latitude,
			success: function(response){
				for(i = 0; i < response.length; i++){
					addMarker(response[i].loc[0], response[i].loc[1], response[i]._brand[0]);
				}
			}
		});
	}

	function placeGenericMarker(location){
		
		userMarker.setPosition(location);
		centerMap(location.lat(), location.lng(), false);
		//map.setZoom(16);
	}

	google.maps.event.addListener(map, 'click', function(event) {
		placeGenericMarker(event.latLng);
	});

	function resizeOverlay(){
		var width = $(window).width();
		var height = $(window).height();
		$("#productOverlay").parent().width(width).height(height);
	}


	$("#locateMe").on("click", function(event){
		event.preventDefault();
		firstRun = true;
		map.setZoom(17);
		getLocation();
	});

	$(window).bind('orientationchange resize', function(event,ui){
		resizeOverlay();
	});
});