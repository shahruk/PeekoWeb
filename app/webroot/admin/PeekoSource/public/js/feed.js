window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}
function includeJS(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', jsFile));
}

var serverUrl = window.localStorage.getItem('serverUrl');

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
	
	
	update();
	
	$("body").on("click", ".comment", function(e){
		e.preventDefault();
		$(this).addClass('selected').parent().parent().append("<div class='comments'>Test</div>")s;
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
		$(this).find('span').css('visibility', 'hidden');
		$(this).spin(opts);
		var _this = this;
		$(this).addClass('selected');
		$.ajax({
			url: serverUrl+'actions/favorite',
			method: 'POST',
			data: {userid: window.localStorage.getItem('userid'), blockid:$(this).parent().data('id'), brandid: $(this).parent().data('brand')},
			success: function(results){
				$(_this).spin(false);
				$(_this).find('span').css('visibility', 'visible');
			}
		});
	});
	
	$("body").on("click", ".actions .favorite.selected", function(e){
		e.preventDefault();
		var opts = {
			color: "#EF4879",
			lines: 11,
			length: 0,
			width: 3
		};
		$(this).find('span').css('visibility', 'hidden');
		$(this).spin(opts);
		var _this = this;
		$.ajax({
			url: serverUrl+'actions/favorite/delete',
			method: 'POST',
			data: {userid: window.localStorage.getItem('userid'), blockid:$(this).parent().data('id')},
			success: function(results){
				$(_this).spin(false);
				$(_this).find('span').css('visibility', 'visible');
				$(_this).removeClass('selected');
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
