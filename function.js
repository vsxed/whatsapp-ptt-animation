$(document).ready(function (e) {
	var pttbtn = $('.record-right'),
		recordTime = $('.time'),
		spcon = $('.speech-container'),
		sec = 0, min = 0, count = 0,
		restartCount = function() {
			if (count !== 0) {return;}
			count = setInterval(function () {
					if (sec <= 9 && min == 0) {
						recordTime.text(min + ':0' + sec++);
						return min;}
					else if (sec > 9 && sec < 60 && min == 0) {
						recordTime.text(min + ':' + sec++);
						return min;}
					else if (sec >= 60) {
						sec = 0; min = min + 1;
						recordTime.text(min + ':0' + sec++);
						return min;}
					else if (sec <= 9 && min >= 1) {
						recordTime.text(min + ':0' + sec++);
						return min;}
					else if (sec > 9 && sec < 60 && min >= 1) {
						recordTime.text(min + ':' + sec++);
						return min;}
					else if ( sec >= 60 && min >= 1) {
						sec = 0; min = min + 1;
						recordTime.text(min + ':' + sec++);
						return min;}
		}, 1000);};

	pttbtn.on('click', function(e) {
		if ($('.swipe-to-cancel').length == 0) {
			spcon.prepend('<div class="swipe-to-cancel"></div>');
		}
		spcon.css({'right' : "40px"});
		$('.swipe-to-cancel').draggable({ 
			axis: "x", 
			containment: ".speech-container",
			drag: function() {
				if ($('.swipe-to-cancel').offset().left - $('.wa-input-container').offset().left === 40) {
					$(this).draggable('destroy');
					$(this).remove();
					spcon.attr("style", "");
					recordTime.text('0:00');
					clearInterval(count); count = 0; sec = 0; min = 0;
				}
			},
			stop: function() {
				if ($('.swipe-to-cancel').offset().left - $('.wa-input-container').offset().left >= 40) {
					$(this).css({'left' : '55px'});
				}
			}
		});
		restartCount();
	});
});