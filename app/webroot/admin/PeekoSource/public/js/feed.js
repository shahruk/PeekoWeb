$(function(){
	var serverUrl = window.localStorage.getItem('serverUrl');
	$.ajax({
		url: serverUrl+'brands/feed',
		success: function(response){
			for(i = 0; i < response.length; i++){
				$("#content").append("<div class='block'><div class='brand clearfix'><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+response[i]['active_block']['icon']+"\");' class='logo'></div><div class='brandname'>"+response[i]['name']+"</div></div><div><img data-url='"+response[i]['active_block']['url']+"' class='blockImage' src='"+response[i]['active_block']['images']+"'><div class='description'>"+response[i]['active_block']['description']+"</div></div><div class='actions' data-id='"+response[i]['active_block']['id']+"'><div class='favorite'><span class='fa fa-heart'></span></div><div class='share'><span class='fa fa-share'></span></div></div></div>");
			}
		}
	});
	
	$("body").on("click", ".actions > div", function(e){
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
	
	$("body").on("click", ".blockImage", function(e){
		var ref = window.open($(this).attr('url'), '_blank', 'location=false');
	});
});