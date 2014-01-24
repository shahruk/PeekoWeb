window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
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
	$.ajax({
		url: serverUrl+'brands/feed',
		success: function(response){
			for(i = 0; i < response.length; i++){
				$("#content").append("<div class='block'><div class='brand clearfix'><div class='countdownContainer'><span class='fa fa-clock-o'></span><div class='countdown'></div></div><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+response[i]['active_block']['icon']+"\");' class='logo'></div><div class='brandname'>"+response[i]['name']+"</div></div><div><img data-url='"+response[i]['active_block']['url']+"' class='blockImage' src='"+response[i]['active_block']['images']+"'><h3>"+response[i]['active_block']['name']+"</h3><h5>"+response[i]['active_block']['price']+"</h5><div class='description'>"+response[i]['active_block']['description']+"</div></div><div class='actions' data-id='"+response[i]['active_block']['id']+"'><div class='favorite'><span class='fa fa-heart'></span></div><div class='visit' data-url='"+response[i]['active_block']['url']+"'><span class='fa fa-external-link'></span></div><div class='share' data-url='http://peekoapp.com/blocks/"+response[i]['active_block']['number']+"/'"+response[i]['active_block']['permalink']+"' data-description='Find more deals and selections at stores near you at www.peekoapp.com' data-title='Shopping via Peeko (http://peekoapp.com)'><span class='fa fa-share'></span></div></div></div>");
			}
			$(".share").each(function(i, obj){
				console.log(i);
				console.log(obj);
				console.log($(obj).data('url'));
			});
			startCountdown();
		}
	});
	
	$("body").on("click", ".actions .favorite", function(e){
		e.preventDefault();
		var opts = {
			color: "#EF4879",
			lines: 11,
			length: 0,
			width: 3
		};
		
		$(this).spin(opts)
		var _this = this;
		
		$.ajax({
			url: serverUrl+'actions/favorite/'+window.localStorage.getItem('userid')+'/'+$(this).parent().data('id'),
			success: function(results){
				$(_this).spin(false).addClass('selected');
			}
		});
	});

	$("body").on("click", ".share", function(e){
		e.preventDefault();
		$(this).socialShare({
			social: 'facebook,pinterest,reddit,twitter,google',
			title: $(this).data('title'),
			shareUrl: $(this).data('url'),
			description: $(this).data('description'),
			whenSelect: true,
		});
		$(this).click();
		
	});
	
	$("body").on("click", ".blockImage, .visit", function(e){
		var ref = window.open($(this).data('url'), '_blank', 'location=false');
	});
});