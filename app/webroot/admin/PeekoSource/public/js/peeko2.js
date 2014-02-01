window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}
window.localStorage.setItem('serverUrl','http://direct.peekoapp.com:8080/');
var serverUrl = window.localStorage.getItem('serverUrl');

var openWindow = function(url){
	var ref = window.open(url, '_blank', 'EnableViewPortScale=yes');
};

var createBlock = function(brand, favorite){
	var className = "";
	if(favorite){
		className = " favorites";
	}
	$("#content").append("<div class='block"+className+"' data-id='"+brand['active_block']['id']+"'><div class='brand clearfix'><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+brand['active_block']['icon']+"\");' class='logo'></div><div class='brandname'>"+brand['name']+"</div></div><div><a class='blockImageContainer' href='"+brand['active_block']['url']+"'><img class='blockImage' src='"+brand['active_block']['images']+"'></a><h3>"+brand['active_block']['name']+"</h3><h5>"+brand['active_block']['price']+"</h5><div class='description'>"+brand['active_block']['description']+"</div></div><div class='actions' data-id='"+brand['active_block']['id']+"'><div data-url='http://peekoapp.com/blocks/"+brand['active_block']['number']+"/"+brand['active_block']['permalink']+"' data-name='"+brand['active_block']['name']+"' data-img='"+brand['active_block']['images']+"' class='social'></div><a href='#' class='favorite'><span class='fa fa-heart'></span></a><a href='#' class='visit' data-url='"+brand['active_block']['url']+"'><span class='fa fa-external-link'></span></a><a href='#' class='comment'><span class='fa fa-comments'></span></a></div><div class='discussion'><form role='form'><div class='form-group'><textarea name='usercomment' class='form-control' rows='2'></textarea><div class='clearfix'>Posting as "+window.localStorage.getItem('username')+"<input type='hidden' name='blockid' value='"+brand['active_block']['id']+"' /> <input type='hidden' name='userid' value='"+window.localStorage.getItem('userid')+"' /> <input type='submit' class='btn btn-success btn-xs' value='Post Comment' /></div></div></form><div class='user-comments'></div></div></div>");
};

var showBlock = function(data){
	
	$("#productOverlay").fadeIn(400).html("<div class='block' data-id='"+data.id+"'><div class='brand clearfix'><div class='countdownContainer'><div class='countdown'></div></div><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+data.icon+"\");' class='logo'></div></div><div><a class='blockImageContainer' href='"+data.url+"'><img class='blockImage' src='"+data.images+"'></a><h3>"+data.name+"</h3><h5>"+data.price+"</h5><div class='description'>"+data.description+"</div></div><div class='actions' data-id='"+data.id+"'><div data-url='http://peekoapp.com/blocks/"+data.number+"/"+data.permalink+"' data-name='"+data.name+"' data-img='"+data.images+"' class='social'></div><a href='#' class='favorite'><span class='fa fa-heart'></span></a><a href='#' class='visit' data-url='"+data.url+"'><span class='fa fa-external-link'></span></a><a href='#' class='comment'><span class='fa fa-comments'></span></a></div><div class='discussion'><form role='form'><div class='form-group'><textarea name='usercomment' class='form-control' rows='2'></textarea><div class='clearfix'>Posting as "+window.localStorage.getItem('username')+"<input type='hidden' name='blockid' value='"+data.id+"' /> <input type='hidden' name='userid' value='"+window.localStorage.getItem('userid')+"' /> <input type='submit' class='btn btn-success btn-xs' value='Post Comment' /></div></div></form><div class='user-comments'></div></div></div>");
};

var update = function(number){
	if(!number){number = 0;}
	$.ajax({
		url: serverUrl+'brands/feed',
		success: function(response){
			for(i = 0; i < response.length; i++){
				createBlock(response[i]);
			}
			social();
			getFavorites();
			
		}
	});
};

var social = function(){
	$("#content .social").each(function(index){
		$(this).share({
			networks: ['facebook', 'twitter', 'pinterest'],
			urlToShare: $(this).data('url'),
			img: $(this).data('img'),
			title: "Peeko "+$(this).parent().parent().find('h5').text()+" - "+$(this).data('name'),
			description: encodeURIComponent("Find more deals and products like this near you at www.peekoapp.com")
		});
	});
};

var initMap = function(){
	var firstRun = true;
	var markers = [];
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
	
	getLocation();
	
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
	
	function showOverlay(marker, data, name){
		dataHolder = data;
		startCountdown();
		showBlock(data);
		social();
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
};


var startMap = function(){
	$("#content").html('<div id="map"><div id="productOverlay"></div><div id="map-canvas"></div></div>');
	$("#map, #map-canvas").show().css('min-height', $(window).height()-$('header').height());
	initMap();
	
};

var getFavorites = function(){
	$.ajax({
		url: serverUrl+'favorites/'+window.localStorage.getItem('userid'),
		success: function(response){
			for(i = 0; i< response.length; i++){
				$(".actions[data-id='"+response[i]['block_id']+"'] a.favorite").addClass('selected');
			}
		}
	});
};

var addComment = function(container, username, message){
	$(container).find('.user-comments').append("<div class='user-comment'><b style='color: #34B5DC;'>@"+username+"</b> "+message+"</div>");
};

$(function(){
	$("meta[name='viewport']").attr('content', 'width=400,user-scalable=no');
	
	document.addEventListener("deviceready", onDeviceReady, false);
	onDeviceReady();
	function onDeviceReady(){
		$("body").on("click", "#menu li a", function(e){
			
			if($(this).hasClass('selected')){
				return false;
			}
			e.preventDefault();
			
			if($(this).attr('href') == "#feed"){
				$("#menu a").removeClass('selected');
				$(this).addClass('selected');
				$("#content").html('');
				update();
			}
			else if($(this).attr('href') == "#favorites"){
				$("#menu a").removeClass('selected');
				$(this).addClass('selected');
				$("#content").html('');
				$.ajax({
					url: serverUrl+'feed/favorites/'+window.localStorage.getItem('userid'),
					success: function(response){
						for(i = 0; i < response.length; i++){
							response[i]['name'] = "";
							response[i]['active_block'] = response[i]['block_id'];
							response[i]['active_block']['id'] = response[i]['active_block']['_id'];
							createBlock(response[i]);
						}
						getFavorites();
						social();
					}
				});
			}
			else if($(this).attr('href') == '#website'){
				openWindow("http://peekoapp.com");
			}
			
			else if($(this).attr('href') == '#facebook'){
				openWindow("https://www.facebook.com/PeekoApp");
			}
			
			try{
				$("#menu").panel("close");
			}catch(e){}
		});
		
		$("#mapLink").click(function(e){
			e.preventDefault();
			startMap();
			
		});
		
		$("#menuLink").click(function(e){
			e.preventDefault();
			
		});
		
		try{
			$("#menu").panel({
				open: function(e,u){$("meta[name='viewport']").attr('content', 'width=400,initial-scale=.9,maximum-scale=1.0,user-scalable=no');},
				close: function(e, u){$("meta[name='viewport']").attr('content', 'width=400,user-scalable=no');}
			});
		}catch(e){}
	}

});