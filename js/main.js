'use strict;'

$(function(){
	$('#container').css({
		'-webkit-transform': 'rotateY(0deg)',
		'opacity': '1'
	})
	setTimeout(function(){
		$('#saying h1').autotype('Durma ou acorde na hora certa')
	}, 650);

	// calculates bedtimes
	function calcWakeUpTimes( time ){
		var bedDate = new Date( time ),
			wakeUpTimes = [];

		// You take 14mins to fall asleep
		bedDate.setMinutes( bedDate.getMinutes() + 14 );


		for( var cicle = 0; cicle < 6; cicle++ ){
			// add an hour and a half
			bedDate.setMinutes( bedDate.getMinutes() + 90 );
			wakeUpTimes.push( new Date(bedDate) );	
		}

		return wakeUpTimes;
	}


	// calcultes bedtimes based in wake up time
	function bedTimes( wakeUpTime ){
		var sleepTimes = [];

		// Back 9 hours
		wakeUpTime.setMinutes( wakeUpTime.getMinutes() + -9 * 60 );

		// Pre-init
		sleepTimes.push( new Date(wakeUpTime) );
		for( var cicle = 0; cicle < 3; cicle++ ){
			console.log(wakeUpTime)
			wakeUpTime.setMinutes( wakeUpTime.getMinutes() + 90 );
			sleepTimes.push( new Date(wakeUpTime) );
		}

		return sleepTimes;
	}


	// Views
	var wakeUpSelect = tmpl('wakeUpTime-tmpl',{});
	$('#wakeUpTime').html(wakeUpSelect);

	$('#wakeUpTime-btn').click(function(){
		var date = new Date();
			date.setHours( $('#wake-hour').val() );
			date.setMinutes( $('#wake-minutes').val() );
			date.setSeconds(0);

		var sleepTimes = bedTimes( date )
			list = tmpl('times-list-tmpl', {
				title: 'Você deve ir dormir em uma das seguintes horas',
				times: sleepTimes
			});

		$('#results').html( list );
	});

	$('#sleep-now').click(function(){
		var date = new Date(),
			sleepTimes = calcWakeUpTimes( date )
			list = tmpl('times-list-tmpl', {
				title: 'Você deve acordar em uma das seguintes horas',
				times: sleepTimes
			});

		$('#results').html( list );
	});
})
