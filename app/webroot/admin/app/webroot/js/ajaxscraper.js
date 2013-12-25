$(function(){
	$("#scrape").click(function(e){
		e.preventDefault();
		$.ajax({
			url: '/app/webroot/admin/blocks/getsite',
			data: {url: $("#BlockUrl").val()},
			method: 'POST', 
			success: function(response){
				try{
					data = JSON.parse(response);
					$("#BlockName").val(data.name);
					$("#BlockDescription").val(data.description);
					$("#BlockImages").val(data.images);
					$("#BlockUrl").val(data.url);
					$("#BlockPrice").val(data.price);
					
				}catch(e){
					$("#BlockPrice").focus();
				}
			}
		});
	});
});