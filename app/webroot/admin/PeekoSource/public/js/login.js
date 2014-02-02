var serverUrl = window.localStorage.getItem('serverUrl');
var returningUser = window.localStorage.getItem('userid');
if(returningUser && (window.localStorage.getItem('username') != null)){
	window.location.href = "feed.html";
}



$(function(){
	var login = function(userid, username){
		window.localStorage.setItem('userid', userid);
		window.localStorage.setItem('username', username);
		window.location.href = "feed.html";
	};
	
	var validate = function(form, data){
		var select = $(form);
		if(data.email.error){
			select.find('input[name="email"]').parent().parent().addClass('has-error');
			select.find('input[name="email"]+.error').html(data.email.message);
		}else{
			select.find('input[name="email"]').parent().parent().removeClass('has-error');
			select.find('input[name="email"]+.error').html('');
		}
		if(data.username.error){
			select.find('input[name="username"]').parent().parent().addClass('has-error');
			select.find('input[name="username"]+.error').html(data.username.message);
		}else{
			select.find('input[name="username"]').parent().parent().removeClass('has-error');
			select.find('input[name="username"]+.error').html('');
		}
		if(data.password.error){
			select.find('input[name="password"]').parent().parent().addClass('has-error');
			select.find('input[name="password"]+.error').html(data.password.message);
		}else{
			select.find('input[name="password"]').parent().parent().removeClass('has-error');
			select.find('input[name="passwords"]+.error').html('');
		}		
	};
	
	$("#register").click(function(e){
		e.preventDefault();
		$("form").slideUp();
		$("#registerForm").stop(true,true).slideDown();
		/*if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			$("#registerForm").slideDown();
		}else{
			window.location.href = "feed.html";
		}*/
	});
	
	$("#login").click(function(e){
		e.preventDefault();
		$("form").slideUp();
		$("#loginForm").stop(true,true).slideDown();
	});
	
	$("#continueGuest").click(function(e){
		e.preventDefault();
		window.location.href = "map.html";
	});
	
	$("#registerForm").submit(function(e){
		e.preventDefault();
		$.ajax({
			url: serverUrl+'signup',
			method: 'POST',
			data: $(this).serialize(),
			success: function(data){
				console.log(data);
				if(data.registered){
					login(data.id, data.username);
				}else{
					validate("#registerForm", data);
				}
			},
			error: function (xmlHttpRequest, textStatus, errorThrown) {
				if(xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0) 
					  return;  // it's not really an error
				else{
					console.log(textStatus);
					console.log(errorThrown);
				}
			}
		});
	});
	
	$("#loginForm").submit(function(e){
		e.preventDefault();
		$.ajax({
			url: serverUrl+'login',
			method: 'POST',
			data: $(this).serialize(),
			success: function(data){
				console.log(data);
				if(data.logged){
					login(data.id, data.username);
				}else{
					$("#loginForm input[name='email']+div.error").html(data.message);
				}
			},
			error: function (xmlHttpRequest, textStatus, errorThrown) {
				if(xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0) 
					  return;  // it's not really an error
				else{
					console.log(textStatus);
					console.log(errorThrown);
				}
			}
		});
	});
});

