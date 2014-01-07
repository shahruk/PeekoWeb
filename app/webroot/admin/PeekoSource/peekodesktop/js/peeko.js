 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
$(function(){

  ga('create', 'UA-2509553-13', 'peekoapp.com');
  ga('send', 'pageview');

	var myKey = "AIzaSyAGbtVZdTdW227zjB-jfmJjzrpHCiayTzc";
	var script = document.createElement('script');
	script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKey + "&sensor=true&callback=initialize";
	document.body.appendChild(script);
});

function initialize(){
		$("body").show();
		$("body").prepend("<div id='tutorial'><a class='endTutorial btn btn-primary btn-lg' href='#'>Skip Tutorial</a><div id='steps'><div><img src='http://i.imgur.com/qTcG9T2.png' /> <h2>Find Daily Deals and Selections Near You</h2><div class='description'>Browse popular stores like H&M, Forever 21, Best Buy, Starbucks, American Eagle, Macy's, and much more straight from your phone. There's always a new deal or selection to browse from!</div></div><div><img src='http://i.imgur.com/sFRTOkn.png' /> <h2>Shop In Store or Online</h2>. When you see something you like, either purchase online or swing by and checkout in person!</div></div><a class='endTutorial btn btn-success btn-lg' href='#'>Continue</a></div>");
		$("body").on('click', '.endTutorial', function(e){
			e.preventDefault();
			$("#tutorial").fadeOut(300);
			$("body").show();
			//Local storage is not set, hence first time launch. set the local storage item
			window.localStorage.setItem('launchCount',1);
		});
		var serverUrl = "http://localhost:8080/";
		var markers = [];
		var firstRun = true;
		var shareHandler;
		var dataHandler;
		
		var styles = {
			stylers: [
				{ visibility: "off"}
			]
		};
		var mapOptions = {
			center: new google.maps.LatLng(120, 60),
			zoom: 14,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: styles
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(120, 60),
			map: map,
			icon: { 
				url: serverUrl+'img/me.png',
				scaledSize: new google.maps.Size(24,28),
				animation: google.maps.Animation.DROP
			}
		});
		

		
		var userMarker = new google.maps.Marker({
			position: new google.maps.LatLng(120, 60), 
			map: map
		});
		
		startCountdown();
		
		/*
		
		// Wait for device API libraries to load
		//
		document.addEventListener("deviceready", onDeviceReady, false);
		
		//When device is ready, do onSuccess.
		function onDeviceReady(){
			var options = { timeout: 30000 };
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
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
			alert("Unfortunately it looks like you're not connected. You will need to have internet access and allow us to use your location for Peeko to work.");
		}
		*/
		onSuccess(new Object({coords: {latitude: '40.690768', longitude: '-73.866189' } }));
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
		
		//Show an overlay.
		function showOverlay(marker, data){
			dataHandler = data;
			console.log(data);
			$("#productName").text(data.name);
			$("#description").html(data.description);
			$("#price").html(data.price);
			$("#buyOnline").attr('href', data.url);
			$("#productImage").attr('src', data.images);
			$("#productOverlay").fadeIn(400);
			$("#storeLogo").attr('src', serverUrl+'brands/'+data.icon);
			shareHandler = $("#share").click(function(e){
				e.preventDefault();
				window.plugins.socialsharing.share('$'+data.price+' - '+data.name, null, data.images, data.url);
			});
		}
		
		//Add a marker
		function addMarker(longitude, latitude, data){
			var tmpMarker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				icon: {
					url: serverUrl+'brands/'+data.active_block['icon'],
					scaledSize: new google.maps.Size(80,100),
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
				showOverlay(tmpMarker, data['active_block']);
			});
		
			markers.push(tmpMarker);
		}
		
		function centerMap(latitude, longitude, moveMap){
			var geo = new google.maps.LatLng(latitude, longitude);
			if(moveMap){
				map.setCenter(geo);
				marker.setPosition(geo);
			}else{
				map.setZoom(18);
			}
			$.ajax({
				url: serverUrl+'blocks/'+longitude+'/'+latitude,
				success: function(response){
					for(i = 0; i < response.length; i++){
						map.setZoom(18);
						addMarker(response[i].loc[0], response[i].loc[1], response[i]._brand[0]);
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
		
		function resizeOverlay(){
			var width = $(window).width();
			var height = $(window).height();
			$("#productOverlay").parent().width(width).height(height);
		}
		
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
			$('#countdown').countdown({until: $.countdown.UTCDate(-5, countdown)});
		}
		
		$("#close").click(function(){
			$("#productOverlay").fadeOut(400);
		});
		
		$("#buyOnline").click(function(event){
			event.preventDefault();
			var ref = window.open($(this).attr('href'), '_blank', 'location=yes');
		});
		
		$("#locateMe").on("click", function(event){
			event.preventDefault();
			firstRun = true;
			map.setZoom(18);
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		});
		
		$(window).bind('orientationchange resize', function(event,ui){
			resizeOverlay();
		});
}