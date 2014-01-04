$(function(){
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
});