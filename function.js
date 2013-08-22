$(document).ready(function () {
	var pttbtn = $('.record-right'),
		recordTime = $('.time'),
		spcon = $('.speech-container'),
		sec = 0,
		min = 0;
		count = 0,
		restartCount = function() {
	if (count !== 0) {
		return;
	}
	count = setInterval(function () {
		if (sec <= 9 && min == 0) {
			recordTime.text(min + ':0' + sec++);
		} else if (sec > 9 && sec < 60 && min == 0) {
			recordTime.text(min + ':' + sec++);
		} else if (sec == 60 && min == 0) {
			sec = 0;
			min = 1;
			recordTime.text(min + ':0' + sec++);
		} else if (sec <= 9 && min == 1) {
			min = 1;
			recordTime.text(min + ':0' + sec++);
		} else if (sec > 9 && sec < 60 && min == 1) {
			sec = 0;
			min = 1;
			recordTime.text(min + 1 + ':' + sec++);
		}
	}, 1000);};

	pttbtn.on('mouseenter', function() {
		if ($('.swipe-to-cancel').length == 0) {
			spcon.append('<div class="swipe-to-cancel"></div>');
		}
		
		spcon.css({'right' : "40px"});
		restartCount();
	});

	pttbtn.on('mouseleave', function() {
		// $('.swipe-to-cancel').remove();
		// spcon.attr("style", "");
		// recordTime.text('0:00');
		// clearInterval(count);
		// count = 0;
		// time = 0;
	});
});

// function() {
// 	if (count !== 0) {
// 		return;
// 	}
// 	count = setInterval(function () {
// 		if (time < 10) {
// 			recordTime.text('0:0' + time++);
// 		} else if (time = 60) {
// 			time = 0;
// 			recordTime.text('1:0' + time++);
// 		} else {
// 			recordTime.text('0:' + time++);
// 		}
// 	}, 1000);};