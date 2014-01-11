
$(function(){
	var myKey = "AIzaSyAGbtVZdTdW227zjB-jfmJjzrpHCiayTzc";
	var script = document.createElement('script');
	script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKey + "&sensor=true&callback=initialize";
	
	var gaScript = document.createElement('script');
	gaScript.src = "http://peekoapp.com:8080/js/ga.js";
	
	document.body.appendChild(script);
	document.body.appendChild(gaScript);
});

function initialize(){
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

	var serverUrl = "http://peekoapp.com:8080/";
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

	startCountdown();

	// Wait for device API libraries to load
	//
	document.addEventListener("deviceready", onDeviceReady, false);

	//When device is ready, do onSuccess.
	function onDeviceReady(){
		getLocation();
		try{
			pushNotification = window.plugins.pushNotification;
			 pushNotification.register(function(result){ alert(result); }, function(error){alert(error); }, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
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
	function showOverlay(marker, data){
		dataHolder = data;
		var voteResult = window.localStorage.getItem(data.id);
		var upvoted;
		var downvoted;
		
		//console.log(voteResult);
		if(voteResult == null){
			upvoted = false;
			downvoted = false;
		}
		if(voteResult == 1){
			upvoted = true;
			downvoted = false;
		}
		if(voteResult == -1){
			upvoted = false;
			downvoted = true;
		}
		
		$("#productName").text(data.name);
		$("#description").html(data.description);
		$("#price").html(data.price);
		$("#buyOnline").attr('href', data.url);
		$("#productImage").attr('src', data.images);
		$("#storeLogo").attr('src', serverUrl+'brands/'+data.icon);
		$("#productOverlay").fadeIn(400);
		$('#topic').upvote({
			id: data.id,
			count: data.score,
			upvoted: upvoted,
			downvoted: downvoted,
			callback: function(results){
				var tmpVote = 0;
				if(results.downvoted == true){
					tmpVote = -1;
				}else if(results.upvoted == true){
					tmpVote = 1;
				}
				if(tmpVote != 0){
					window.localStorage.setItem(data.id,tmpVote);
				}
				$.ajax({
					url: 'http://peekoapp.com/blocks/vote',
					type: 'post',
					data: { id: results.id, up: results.upvoted, down: results.downvoted, count: results.count }
				});
			}
		});
		
		
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

	function startCountdown(){
		$("#productOverlay").html("<div class='clearfix'> <button id='close' type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> </div> <div class='row'> <div class='col-md-6'> <img id='productImage' src='' /> </div> <div class='col-md-6'> <h3 id='productName'></h3><h3 style='margin-top: 0;'><span id='price'>0.00</span></h3> <hr /> <div class='row'><div class='col-md-12 col-xs-12'> <div id='description'> </div> </div> </div> <hr /> <img id='storeLogo' /> <div class='row'><div class='col-md-3 col-xs-3'> <div id='vote'> <div id='topic' class='upvote'> <a class='upvote'></a> <span class='count'>5</span> <a class='downvote'></a> <!-- <a class='star starred'></a> --> </div> </div> </div><div class='col-md-5 col-xs-1'> &nbsp; </div><div class='col-md-4 col-xs-8'><a href='http://google.com/' class='btn btn-lg btn-success' target='_system' id='buyOnline'><span class='glyphicon glyphicon-shopping-cart'></span> Visit Website</a><a href='#' class='btn btn-lg btn-primary' id='share'><span class='glyphicon glyphicon-share'></span> Share This </a> <div id='countdown'></div> </div> </div>");
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

	$("#share").on('click', function(e){
		e.preventDefault();
		window.plugins.socialsharing.share($("#price").html()+' - '+$("#productName").text()+' via Peeko iOS', null, $("#productImage").attr('src'), 'http://peekoapp.com/blocks/'+dataHolder.number+'/'+dataHolder.permalink);
	});

	$("#locateMe").on("click", function(event){
		event.preventDefault();
		firstRun = true;
		map.setZoom(17);
		getLocation();
	});

	$(window).bind('orientationchange resize', function(event,ui){
		resizeOverlay();
	});
}



















/*!
 * jQuery Upvote - a voting plugin
 * ------------------------------------------------------------------
 *
 * jQuery Upvote is a plugin that generates a voting widget like
 * the one used on Stack Exchange sites.
 *
 * Licensed under Creative Commons Attribution 3.0 Unported
 * http://creativecommons.org/licenses/by/3.0/
 *
 * @version         1.0.2
 * @since           2013.06.19
 * @author          Janos Gyerik
 * @homepage        https://janosgyerik.github.io/jquery-upvote
 * @twitter         twitter.com/janosgyerik
 *
 * ------------------------------------------------------------------
 *
 *  <div id="topic" class="upvote">
 *    <a class="upvote"></a>
 *    <span class="count"></span>
 *    <a class="downvote"></a>
 *    <a class="star"></a>
 *  </div>
 *
 *  $('#topic').upvote();
 *  $('#topic').upvote({count: 5, upvoted: true});
 *
 */

;(function($) {
    "use strict";
    var namespace = 'upvote';

    function init(options) {
        return this.each(function() {
            methods.destroy.call(this);

            var count = parseInt($(this).find('.count').text());
            count = isNaN(count) ? 0 : count;
            var initial = {
                id: $(this).attr('data-id'),
                count: count,
                upvoted: $(this).find('.upvoted').size(),
                downvoted: $(this).find('.downvoted').size(),
                starred: $(this).find('.starred').size(),
                callback: function() {}
            };

            var data = $.extend(initial, options);
            if (data.upvoted && data.downvoted) {
                data.downvoted = false;
            }

            var that = $(this);
            that.data(namespace, data);
            render(that);
            setupUI(that);
        });
    }

    function setupUI(that) {
        that.find('.upvote').addClass('upvote-enabled');
        that.find('.downvote').addClass('upvote-enabled');
        that.find('.star').addClass('upvote-enabled');
        that.find('.upvote').on('click.' + namespace, function() {
            that.upvote('upvote');
        });
        that.find('.downvote').on('click.' + namespace, function() {
            that.upvote('downvote');
        });
        that.find('.star').on('click.' + namespace, function() {
            that.upvote('star');
        });
    }

    function _click_upvote() {
        this.find('.upvote').click();
    }

    function _click_downvote() {
        this.find('.downvote').click();
    }

    function _click_star() {
        this.find('.star').click();
    }

    function render(that) {
        var data = that.data(namespace);
        that.find('.count').text(data.count);
        if (data.upvoted) {
            that.find('.upvote').addClass('upvoted');
            that.find('.downvote').removeClass('downvoted');
        }
        else if (data.downvoted) {
            that.find('.upvote').removeClass('upvoted');
            that.find('.downvote').addClass('downvoted');
        }
        else {
            that.find('.upvote').removeClass('upvoted');
            that.find('.downvote').removeClass('downvoted');
        }
        if (data.starred) {
            that.find('.star').addClass('starred');
        }
        else {
            that.find('.star').removeClass('starred');
        }
    }

    function callback(that) {
        var data = that.data(namespace);
        data.callback(data);
    }

    function upvote() {
        var data = this.data(namespace);
        if (data.upvoted) {
            data.upvoted = false;
            --data.count;
        }
        else {
            data.upvoted = true;
            ++data.count;
            if (data.downvoted) {
                data.downvoted = false;
                ++data.count;
            }
        }
        render(this);
        callback(this);
        return this;
    }

    function downvote() {
        var data = this.data(namespace);
        if (data.downvoted) {
            data.downvoted = false;
            ++data.count;
        }
        else {
            data.downvoted = true;
            --data.count;
            if (data.upvoted) {
                data.upvoted = false;
                --data.count;
            }
        }
        render(this);
        callback(this);
        return this;
    }

    function star() {
        var data = this.data(namespace);
        data.starred = ! data.starred;
        render(this);
        callback(this);
        return this;
    }

    function count() {
        return this.data(namespace).count;
    }

    function upvoted() {
        return this.data(namespace).upvoted;
    }

    function downvoted() {
        return this.data(namespace).downvoted;
    }

    function starred() {
        return this.data(namespace).starred;
    }

    var methods = {
        init: init,
        count: count,
        upvote: upvote,
        upvoted: upvoted,
        downvote: downvote,
        downvoted: downvoted,
        starred: starred,
        star: star,
        _click_upvote: _click_upvote,
        _click_downvote: _click_downvote,
        _click_star: _click_star,
        destroy: destroy
    };

    function destroy() {
        return $(this).each(function() {
            $(window).unbind('.' + namespace);
            $(this).removeClass('upvote-enabled');
            $(this).removeData(namespace);
        });
    }

    $.fn.upvote = function(method) {  
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.upvote');
        }
    };  
})(jQuery);