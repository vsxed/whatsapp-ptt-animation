$(document).ready(function (e) {
	var pttbtn = $('.record-right'),
		recordTime = $('.time'),
		spcon = $('.speech-container'),
		btnEmoticon = $('.emoticon'),
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
		btnEmoticon.addClass('hide');
		$('.record-left').addClass('record-start');
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
					
					$('.record-left').removeClass('record-start').addClass('show small record-delete').delay(2000).queue(function() {
            			$(this).removeClass('show small record-delete').dequeue();
            			// btnEmoticon.removeClass('hide').dequeue(); 
       				});

       				$('.bin').delay(1000).queue(function() {
       					$(this).css({'bottom' : '5px'}).dequeue();
       				});

       				$('.bin').delay(1000).queue(function() {
       					$(this).css({'bottom' : '-40px'}).dequeue();
       				});

       				$('.bin-head').delay(1000).queue(function() {
       					$(this).addClass('anim').dequeue();
       				});

       				$('.bin-head').delay(1000).queue(function() {
       					$(this).removeClass('anim').dequeue();
       					$('.bin').removeClass('show').dequeue(); 
       				});

       				btnEmoticon.delay(2500).queue(function() {
						$(this).removeClass('hide').dequeue();
       				});
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