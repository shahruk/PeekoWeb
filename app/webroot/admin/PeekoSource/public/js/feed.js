window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}
function includeJS(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', jsFile));
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
	
	var serverUrl = window.localStorage.getItem('serverUrl');
	var update = function(number){
		if(!number){number = 0;}
		$.ajax({
			url: serverUrl+'brands/feed',
			success: function(response){
				for(i = 0; i < response.length; i++){
					$("#content").append("<div class='block' id='"+response[i]['active_block']['id']+"'><div class='brand clearfix'><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+response[i]['active_block']['icon']+"\");' class='logo'></div><div class='brandname'>"+response[i]['name']+"</div></div><div><img data-url='"+response[i]['active_block']['url']+"' class='blockImage' src='"+response[i]['active_block']['images']+"'><h3>"+response[i]['active_block']['name']+"</h3><h5>"+response[i]['active_block']['price']+"</h5><div class='description'>"+response[i]['active_block']['description']+"</div></div><div class='actions' data-id='"+response[i]['active_block']['id']+"'><div data-url='http://peekoapp.com/blocks/"+response[i]['active_block']['number']+"/"+response[i]['active_block']['permalink']+"' data-name='"+response[i]['active_block']['name']+"' data-price='"+response[i]['active_block']['price']+"' data-img='"+response[i]['active_block']['images']+"' class='social'></div><a href='#' class='favorite'><span class='fa fa-heart'></span></a><a href='#' class='visit' data-url='"+response[i]['active_block']['url']+"'><span class='fa fa-external-link'></span></a><a href='#' class='comment'><span class='fa fa-comments'></span></a></div></div>");
				}
				$(".social").each(function(index){
					$(this).share({
						networks: ['facebook', 'twitter', 'pinterest'],
						urlToShare: $(this).data('url'),
						img: $(this).data('img'),
						title: "Peeko "+$(this).data('price')+" - "+$(this).data('name'),
						description: "Find more deals and products like this near you at www.peekoapp.com"
					});
				});
				
			}
		});
	};
	
	var getFavorites = function(){
		$.ajax({
			url: serverUrl+'userfavorites/'+userid,
			success: function(response){
				
			}
		});
	};
	
	update();
	getFavorites();
	
	$("body").on("click", ".share", function(e){
		e.preventDefault();
		alert("SHARE");
	});
	
	$("body").on("click", ".visit", function(e){
		e.preventDefault();
		var ref = window.open($(this).data('url'), '_blank', 'location=yes');	
	});

	$("body").on("click", ".actions .favorite", function(e){
		e.preventDefault();
		var opts = {
			color: "#EF4879",
			lines: 11,
			length: 0,
			width: 3
		};
		
		$(this).spin(opts);
		var _this = this;
		$(this).addClass('selected');
		$.ajax({
			url: serverUrl+'actions/favorite/'+window.localStorage.getItem('userid')+'/'+$(this).parent().data('id'),
			success: function(results){
				$(_this).spin(false);
			}
		});
	});

	
	$("body").on("click", ".blockImage, .visit", function(e){
		try{
			var ref = window.open($(this).data('url'), '_blank', 'location=false');
		}catch(e){
			alert(e);
		}
	});
});

$.event.special.tap = {
  setup: function() {
    var self = this,
      $self = $(self);

    // Bind touch start
    $self.on('touchstart', function(startEvent) {
      // Save the target element of the start event
      var target = startEvent.target;

      // When a touch starts, bind a touch end handler exactly once,
      $self.one('touchend', function(endEvent) {
        // When the touch end event fires, check if the target of the
        // touch end is the same as the target of the start, and if
        // so, fire a click.
        if (target == endEvent.target) {
          $.event.simulate('tap', self, endEvent);
        }
      });
    });
  }
};