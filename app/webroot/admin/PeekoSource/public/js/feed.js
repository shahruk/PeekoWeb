window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}

function trim11 (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

function includeJS(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', jsFile));
}
var timeout = 0;
var serverUrl = window.localStorage.getItem('serverUrl');

setInterval(function(){
	if(timeout > 0){
		timeout--;
	}
}, 1000);
 
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
	
	$("body").on("submit", ".discussion form", function(e){
		var _this = this;
		if(trim11($(this).find('textarea').val()).length < 1){
			return false;
		}
		e.preventDefault();
		$.ajax({
			url: serverUrl+'addcomment',
			method: 'POST',
			data: $(this).serialize(),
			success: function(response){
				if(response.saved){
					addComment($(_this).parent(), window.localStorage.getItem('username'), $(_this).find('textarea').val());
					$(_this).find('textarea').val('');
					
				}else{
				}
			}
		});
	});
	
	$("body").on("click", ".comment", function(e){
		if($(this).hasClass('selected')){
			$(this).removeClass('selected').parent().parent().find('.discussion').stop(true,true).slideUp();
			$(".user-comments").html('');
			return false;
		}else{
			e.preventDefault();
			var _this = this;
			$.ajax({
				url: serverUrl+'comments/'+$(_this).parent().parent().data('id'),
				success: function(response){
					for(i = 0; i < response.length; i++){
						try{
							addComment($(_this).parent().parent(), response[i]['user_id']['username'], response[i]['message']);
						}catch(e){}
					}
				}
			});
			
			$(this).addClass('selected').parent().parent().find('.discussion').stop(true,true).fadeIn(500);
			$(this).parent().parent().find('textarea').focus();
			console.log($(this).parent().parent().find('textarea')[0].offsetTop);
			$("#content").animate({scrollTop: ($(this).parent().parent().find('textarea')[0].offsetTop-30)}, 400);
		}
	});

	$("body").on("click", ".actions .favorite", function(e){
		e.preventDefault();
		if($(this).hasClass('selected')){
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
		}else{
			
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
		}
	});

	document.addEventListener("deviceready", onDeviceReady, false);
	onDeviceReady();
	function onDeviceReady(){
		$("body").on("click", ".visit", function(e){
			e.preventDefault();
			openWindow($(this).data('url'));	
		});
		
		$("body").on("click", ".block .social a", function(e){
			e.preventDefault();
			openWindow($(this).attr('href'));
		});
		
		$("body").on("click", ".blockImageContainer, .visit", function(e){
			e.preventDefault();
			if($(this).hasClass('blockImageContainer')){
				openWindow($(this).attr('href'));
			}else{
				try{
					openWindow($(this).data('url'));
				}catch(err){
					alert(err);
				}
			}
		});
	}
	
});
