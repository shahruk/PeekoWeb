
//Google Analytics
var gaPlugin;
  
$(function(){

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
			$("#productOverlay").fadeIn(400);
			$("#storeLogo").attr('src', serverUrl+'brands/'+data.icon);
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
			$("#productOverlay").html("<div class='clearfix'> <button id='close' type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> </div> <div class='row'> <div class='col-md-6'> <img id='productImage' src='' /> </div> <div class='col-md-6'> <h3 id='productName'></h3> <!-- <a href='#' class='btn btn-primary' id='share'><span class='glyphicon glyphicon-share'></span> Share This </a> --> <h3 style='margin-top: 0;'><span id='price'>0.00</span></h3> <hr /> <div class='row'><div class='col-md-12 col-xs-12'> <div id='description'> </div> </div> </div> <hr /> <img id='storeLogo' /> <div class='row'><div class='col-md-2 col-xs-2'> <div id='vote'> <div id='topic' class='upvote'> <a class='upvote'></a> <span class='count'>5</span> <a class='downvote'></a> <!-- <a class='star starred'></a> --> </div> </div> </div><div class='col-md-6 col-xs-1'> &nbsp; </div><div class='col-md-4 col-xs-9'><a href='http://google.com/' class='btn btn-success' target='_system' id='buyOnline'><span class='glyphicon glyphicon-shopping-cart'></span> Visit Website</a> <div id='countdown'></div> </div> </div>");
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
