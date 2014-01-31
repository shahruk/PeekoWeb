window.onerror = function(message, url, lineNumber) {
	console.log("Error: "+message+" in "+url+" at line "+lineNumber);
}

window.localStorage.setItem('serverUrl','http://direct.peekoapp.com:8080/');
var serverUrl = window.localStorage.getItem('serverUrl');
var createBlock = function(brand, favorite){
	var className = "";
	if(favorite){
		className = " favorites";
	}
	$("#content").append("<div class='block"+className+"' data-id='"+brand['active_block']['id']+"'><div class='brand clearfix'><div style='background-image: url(\"http://direct.peekoapp.com:8080/brands/"+brand['active_block']['icon']+"\");' class='logo'></div><div class='brandname'>"+brand['name']+"</div></div><div><img data-url='"+brand['active_block']['url']+"' class='blockImage' src='"+brand['active_block']['images']+"'><h3>"+brand['active_block']['name']+"</h3><h5>"+brand['active_block']['price']+"</h5><div class='description'>"+brand['active_block']['description']+"</div></div><div class='actions' data-id='"+brand['active_block']['id']+"'><div data-url='http://peekoapp.com/blocks/"+brand['active_block']['number']+"/"+brand['active_block']['permalink']+"' data-name='"+brand['active_block']['name']+"' data-img='"+brand['active_block']['images']+"' class='social'></div><a href='#' class='favorite'><span class='fa fa-heart'></span></a><a href='#' class='visit' data-url='"+brand['active_block']['url']+"'><span class='fa fa-external-link'></span></a><a href='#' class='comment'><span class='fa fa-comments'></span></a></div><div class='discussion'><form role='form'><div class='form-group'><textarea name='usercomment' class='form-control' rows='2'></textarea><div class='clearfix'>Posting as "+window.localStorage.getItem('username')+"<input type='hidden' name='blockid' value='"+brand['active_block']['id']+"' /> <input type='hidden' name='userid' value='"+window.localStorage.getItem('userid')+"' /> <input type='submit' class='btn btn-success btn-xs' value='Post Comment' /></div></div></form><div class='user-comments'></div></div></div>");
};

var update = function(number){
	if(!number){number = 0;}
	$.ajax({
		url: serverUrl+'brands/feed',
		success: function(response){
			for(i = 0; i < response.length; i++){
				createBlock(response[i]);
			}
			$(".social").each(function(index){
				$(this).share({
					networks: ['facebook', 'twitter', 'pinterest'],
					urlToShare: $(this).data('url'),
					img: $(this).data('img'),
					title: "Peeko "+$(this).parent().parent().find('h5').text()+" - "+$(this).data('name'),
					description: "Find more deals and products like this near you at www.peekoapp.com"
				});
			});
			getFavorites();
			
		}
	});
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
	
	try{
		$('#menu').sidr();
	}catch(e){}
	
	
	$("body").on("click", "#sidr a", function(e){
		$("#sidr li").removeClass('active');
		$(this).parent().addClass('active');
		e.preventDefault();
		var backup = $("#content").html();
		
		if($(this).attr('href') == "#feed"){
			$("#content").html($("#backup").html());
			
		}
		else if($(this).attr('href') == "#favorites"){
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
				}
			});
		}
		
		$.sidr('close', 'sidr');
		$("#backup").html(backup);
	});
	$("#map").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
	
	$("#menu").click(function(e){
		e.preventDefault();
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