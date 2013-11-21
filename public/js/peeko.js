$(function(){
	var serverUrl = "http://direct.theboxngo.com:8080/";
	var markers = [];
	var firstRun = true;
	var mapOptions = {
		center: new google.maps.LatLng(120, 60),
		zoom: 18,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(120, 60),
		map: map,
		icon: 'http://i.imgur.com/lmt3bW2.png'
	});
	
	var userMarker = new google.maps.Marker({
		position: new google.maps.LatLng(120, 60), 
		map: map
	});
	
	// Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);
	
	//When device is ready, do onSuccess.
	function onDeviceReady(){
		var options = { timeout: 30000 };
		navigator.geolocation.watchPosition(onSuccess, onError, options);
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
	}
	
	//Show an overlay.
	function showOverlay(marker, data){
		var width = $(window).width() *0.7;
		var widthOffset = ($(window).width() * 0.3)/2;
		var height = $(window).height() *0.7;
		var heightOffset = ($(window).height() * 0.3)/2;
		$("#productOverlay").width(width).height(height).css({left: widthOffset, top: heightOffset});
		$("#productOverlay").fadeIn(400);
		$("#productName").text(data.name);
		$("#description").html(data.description);
		$("#price").text(data.price);
		$("#buyOnline").attr('href', data.url);
	}
	
	//Add a marker
	function addMarker(longitude, latitude, data){
		var tmpMarker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			icon: {
				url: data.icon,
				size: new google.maps.Size(184, 69),
				zIndex: 1,
				// The anchor for this image is the base of the flagpole at 0,32.
				anchor: new google.maps.Point(92,70)
			}
		});
		google.maps.event.addListener(tmpMarker, 'click', function() { 
			if(tmpMarker.getZIndex() == 10){
				showOverlay(tmpMarker, data);
			}else{
				for(i = 0; i < markers.length; i++){
					markers[i].setZIndex(1);
				}
			   tmpMarker.setZIndex(10);
			}
		});
	
		markers.push(tmpMarker);
	}
	
	function centerMap(latitude, longitude, moveMap){
		var geo = new google.maps.LatLng(latitude, longitude);
		if(moveMap){
			map.setCenter(geo);
			marker.setPosition(geo);
		}
		$.ajax({
			url: serverUrl+'blocks/'+longitude+'/'+latitude,
			success: function(response){
				for(i = 0; i < response.length; i++){
					addMarker(response[i].loc[0], response[i].loc[1], response[i]._brand[0]['active_block']);
				}
			}
		});
	}
	
	function placeGenericMarker(location){
		userMarker.setPosition(location);
		centerMap(location.lat(), location.lng(), false);
	}
	
	google.maps.event.addListener(map, 'click', function(event) {
		placeGenericMarker(event.latLng);
	});
	
	$("#close").click(function(){
		$("#productOverlay").fadeOut(400);
	});
});