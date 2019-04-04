$(document).ready(function(){
	// Hide "likes this
	setInterval(function(){ 
		$('.relative.ember-view').each(function(){
			let me = $(this);
			if (me.html().includes('likes this')) {
				me.css('display', 'none');
			}
		
		});
	}, 1000);
	
	// Switch to Recent news
	$('.sort-dropdown__text-container').click();
	$('.sort-dropdown__list-item button.t-12').last().click();
	
});
