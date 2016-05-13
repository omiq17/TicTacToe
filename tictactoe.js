$(document).ready(function () {
	var hulk = "<img src = 'messi.png'></img>";
	var ironMan = "<img src = 'ronaldo.png'></img>";
	var aiPlayer;
	var userPlayer;
	var clicked = [];
	var time = 1;
	var userCombo = [123, 159, 147, 456, 258, 369, 789, 357];
	var aiCombo = [123, 159, 147, 456, 258, 369, 789, 357];
	var cpu = ""; //for ai
	var ai = [];
	var why = ""; //for user
	var user = [];
	//this is for ai's winning combo
	var win = [];
	var draws = 0;
	var losses = 0;
	var consecutiveDraws = 0;

	/**
	 * function for reseting the HEAD !
	 */
	function reset() {
		clicked = [];
		userCombo = [123, 159, 147, 456, 258, 369, 789, 357];
		aiCombo = [123, 159, 147, 456, 258, 369, 789, 357];
		cpu = "";
		ai = [];
		why = "";
		user = [];
		//this is for ai's winning combo
		win = [];

		$(".col-xs-4 img").remove();
		$(".col-xs-4").css("background", "sienna");
		if ((time % 2 == 1)) {
			time = 0;
			//anouncing Users Turn Modal
			$('#myModal4').modal('show');
			setTimeout(function () {
				$('#myModal4').modal('hide');
			}, 1311);
		} else {
			time = 1;
			aiInput();
		}
	}

	/**
	 * function for showing results
	 */
	function scoreCard(result) {
		if (!result) {
			losses++;
			consecutiveDraws = 0;
		} else {
			draws++;
			consecutiveDraws++;
		}
		$("p:nth-child(1) span").text(consecutiveDraws);
		$("p:nth-child(2) span").text(draws);
		$("p:nth-child(3) span").text(losses);

	}

	/**
	* fuction for removing element from aiCombo array
	* the unmatched item copied into result array & return
	*/
	function removeCombo(number, array) {
		var result = [];
		var regex = new RegExp(number);
		for (var i = 0; i < array.length; i++) {
			if (!regex.test(array[i]))
				result.push(array[i]);
		}
		return result;
	}

	/**
	 * Animation FUNCTION for Animate.css
	 */
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated ' + animationName).one(animationEnd, function () {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});

	/**
	* function for ai inputs 
	* if no argument is passed then choose a random number from usable array
	* push it to clicked & ai array & remove from usable
	* finally show the pic
	*/
	function aiInput(random) {
		if (random === undefined)
			random = Math.floor((Math.random() * 9) + 1);
		cpu += random;
		ai = cpu.split('').map(Number);
		//why this isn't working correctly?????
		// ai.push(random); ???
		clicked.push(random);
		userCombo = removeCombo(random, userCombo);
		$(".box" + random).html(aiPlayer);
		$(".box" + random + " img").animateCss("tada");
	}

	/**
	 * function for choosing from given array
	 */
	function chooseFrom(array) {
		var arr = array.filter(function (value) {
			if (clicked.indexOf(value) < 0)
				return value;
		});
		var any = arr[Math.floor(Math.random() *
			arr.length)];
		aiInput(any);
	}

	/**
	 * a simple function for doing some silly works...
	 * when user clicks in a box
	 */
	function sillyWorks(boxNo) {
		time += 2;
		clicked.push(boxNo);
		why += boxNo;
		user = why.split('').map(Number);
		// user.push(input); ??????
		$(".box" + boxNo).html(userPlayer);
		$(".box" + boxNo + " img").animateCss("tada");
		aiCombo = removeCombo(boxNo, aiCombo);
	}

	/**
	* fuction for search winning combo for user of ai both
	* another fuction will be used in this function for seaching.. 
	* matched combinations
	*
	* @param array user or ai input array
	* @param comboArray array to matched with
	* @return combo an array of numbers with winning or losing chances..
	* or returns an empty array
	*/
	function getCombo(array, comboArray) {

		function searchCombo(a, b) {
			var regex = new RegExp('\\d' + a + '' + b + '|' + '\\d' + b + ''
				+ a + '|' + a + '\\d' + b + '|' + b + '\\d' + a + '|'
				+ b + '' + a + '\\d|' + a + '' + b + '\\d');
			var result = [0];
			for (var i = 0; i < comboArray.length; i++) {
				if (regex.test(comboArray[i]))
					result[0] = comboArray[i].toString()
						.match(new RegExp('[^' + a + '' + b + ']'));
			}
			return parseInt(result[0]);
		}

		var combo = [];
		var num = array.splice(array.length - 1, 1);
		for (var i = 0; i < array.length; i++) {
			var comboNo = searchCombo(array[i], num);
			if (comboNo != 0)
				combo.push(comboNo);
		}
		return combo;
	}

	/**
	 * For Enjoying Computer Wins
	 */
	function enjoyWin(winNum) {
		cpu += winNum;
		ai = cpu.split('').map(Number);
		if (ai.length == 3) {
			$(".box" + ai[0]).css("background", "#DFF0D8");
			$(".box" + ai[1]).css("background", "#DFF0D8");
			$(".box" + ai[2]).css("background", "#DFF0D8");
			$(".box" + ai[0] + " img").animateCss("wobble");
			$(".box" + ai[1] + " img").animateCss("wobble");
			$(".box" + ai[2] + " img").animateCss("wobble");
		} else {
			for (var i = 0; i < aiCombo.length; i++) {
				var check = aiCombo[i].toString().split('').map(Number);
				var count = true;
				for (var j = 0; j < 3; j++) {
					if (ai.indexOf(check[j]) < 0)
						count = false;
				}
				if (count)
					break;
			}
			$(".box" + check[0]).css("background", "#DFF0D8");
			$(".box" + check[1]).css("background", "#DFF0D8");
			$(".box" + check[2]).css("background", "#DFF0D8");
			$(".box" + check[0] + " img").animateCss("wobble");
			$(".box" + check[1] + " img").animateCss("wobble");
			$(".box" + check[2] + " img").animateCss("wobble");
		}
	}

	/**
	 * END ALL FUNCTION CALL
	 * 
	 * NOW INITIALIZE THE GAME!
	 *
	 * At first doing the modal work 
	 * Taking the player choice from user & set the user and ai player
	 * 
	 */
	$("#myModal1").modal({
		backdrop: 'static',
		keyboard: false
	});
	$('#myModal1').modal('show');
	$('#myModal1 .modal-footer button').click(function (e) {
		var player = $(this).text();
		if (player == 'Hulk') {
			userPlayer = hulk;
			aiPlayer = ironMan;
		} else {
			userPlayer = ironMan;
			aiPlayer = hulk;
		}
		$('#myModal1').modal('hide');
		aiInput();
	});

	/**
	* when user clicks in a box 
	* get the no. of box clicked
	* fill that box with image
	*/
	$(".row a").click(function (event) {
		event.preventDefault();
		var input = $(this).attr("class");
		input = parseInt(input.slice(-1));

		/**
		* check for a double click in a single box
		* if user cliks one box double time then do nothing
		*
		* if ai click first....
		* increase time, push box no. to clicked & user array
		* match user box no. with aiCombo and remove
		*
		* else if user click first...
		* 
		*/
		if ((clicked.indexOf(input)) == -1 && (time % 2 == 0)) {
			sillyWorks(input);

			/**
			 * checking condition for various user inputs & AI outputs
			 * IN time 2, check if box no. 5 is available or not
			 * else randomly choose from 1,3,7,9
			 * 
			 * IN time 4, if ai[0] is 5 then I have to check.. 
			 * EVERYTHING (named Critical Stage)
			 * first check user input sums are odd or event
			 * if odd then check every possible state
			 * else choose from 1,3,5,7 again 
			 * find out win chance 
			 * 
			 * IN time 6, defend first
			 * otherwise choose from ai Combo
			 * find out win chances
			 * 
			 * IN time 8, defend first again
			 * otherwise choose from ai Combo / give randomly
			 * The game has drawn, isn't it?
			 */

			if (time == 2) {
				if (clicked.indexOf(5) < 0) {
					aiInput(5);
				} else {
					chooseFrom([1, 3, 7, 9]);
				}

				//console.log("blah!");
			} else if (time == 4) {
				var lose = getCombo(user, userCombo);
				var any;
				if (lose.length > 0) {
					aiInput(lose[0]);
				} else {
					if (ai[0] == 5) {
						//this is the critical stage
						var x = clicked[0] + clicked[2];
						//user[1] returning undefined ???
						if ((x % 2) == 0) {
							if (x == 10) {
								chooseFrom([4, 6]);
							} else {
								aiInput(x - 5);
							}
						} else {
							//for odd I have to check every possible state
							if (x == 11) {
								chooseFrom([3, 9]);
							} else if (x == 13) {
								chooseFrom([7, 9]);
							} else if (x == 9) {
								chooseFrom([1, 7]);
							} else if (x == 7) {
								chooseFrom([1, 3]);
							}
						} //end critical
					} else {
						chooseFrom([1, 3, 7, 9]);
					}
					//end of the critical stage
				}
				win = getCombo(ai, aiCombo);

			} else if (time == 6) {
				if (win.length > 0 && win[0] != user[2]) {
					$(".box" + win[0]).html(aiPlayer);
					enjoyWin(win[0]);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else {
					var lose = getCombo(user, userCombo);
					var any;
					if (lose.length > 0) {
						aiInput(lose[0]);
					} else {
						var options = aiCombo[Math.floor(Math.random() *
							aiCombo.length)];
						options = options.toString(10).split('').map(Number);
						chooseFrom(options);
					}
					win = getCombo(ai, aiCombo);

				}
			} else if (time == 8) {
				if (win.length == 2) {
					var last = win[0];
					if (win[0] == user[3])
						last = win[1];
					$(".box" + last).html(aiPlayer);
					enjoyWin(last);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else if (win.length == 1 && win[0] != user[3]) {
					$(".box" + win[0]).html(aiPlayer);
					enjoyWin(win[0]);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else {
					var lose = getCombo(user, userCombo);
					var any;
					if (lose.length > 0) {
						aiInput(lose[0]);
					} else {
						chooseFrom([1, 2, 3, 4, 5, 6, 7, 8, 9]);
					}

				}

			} else if (time == 10) {
				//anouncing draw
				$('#myModal3').modal('show');
				setTimeout(function () {
					$('#myModal3').modal('hide');
					reset();
					scoreCard(true);
				}, 1311);
			}

			//end block
		} else if ((clicked.indexOf(input)) == -1 && (time % 2 == 1)) {
			sillyWorks(input);

			/**
			* checking condition for various user inputs & AI outputs
			* IN time 3, check if 5 is available or not 
			* else randomly choose from 1,3,7,9
			* then get win combo and put it in win if there has one
			*
			* IN time 5, at first check for win 
			* if user dont click in win box then ai wins
			* else check if user got any win combo 
			* if got then ai will defend it by giving input in that box
			* else choose from ai combo array 
			* Now, check the win from aiComboSSSSS
			* 
			* IN time 7 check for win and double chance win
			* then much like time 2
			*
			* IN time 9, check for win 
			* else is like it has to be a Draw Game!!!
			*/
			if (time == 3) {
				if (clicked.indexOf(5) < 0) {
					aiInput(5);
				} else {
					chooseFrom([1, 3, 7, 9]);
				}
				win = getCombo(ai, aiCombo);

			} else if (time == 5) {
				if (win.length > 0 && win[0] != user[1]) {
					$(".box" + win[0]).html(aiPlayer);
					enjoyWin(win[0]);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else {
					var lose = getCombo(user, userCombo);
					var any;
					if (lose.length > 0) {
						aiInput(lose[0]);
					} else {
						var options = aiCombo[Math.floor(Math.random() *
							aiCombo.length)];
						options = options.toString(10).split('').map(Number);
						chooseFrom(options);
					}
					win = getCombo(ai, aiCombo);
				}

			} else if (time == 7) {
				if (win.length == 2) {
					var last = win[0];
					if (win[0] == user[2])
						last = win[1];
					$(".box" + last).html(aiPlayer);
					enjoyWin(last);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else if (win.length == 1 && win[0] != user[2]) {
					$(".box" + win[0]).html(aiPlayer);
					enjoyWin(win[0]);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else {
					var lose = getCombo(user, userCombo);
					var any;
					if (lose.length > 0) {
						aiInput(lose[0]);
					} else {
						var options = aiCombo[Math.floor(Math.random() *
							aiCombo.length)];
						options = options.toString(10).split('').map(Number);
						chooseFrom(options);
					}
					win = getCombo(ai, aiCombo);
				}

			} else if (time == 9) {
				if (win.length == 2) {
					var last = win[0];
					if (win[0] == user[3])
						last = win[1];
					$(".box" + last).html(aiPlayer);
					enjoyWin(last);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else if (win.length == 1 && win[0] != user[3]) {
					$(".box" + win[0]).html(aiPlayer);
					enjoyWin(win[0]);
					//anouncing winner
					$('#myModal2').modal('show');
					setTimeout(function () {
						$('#myModal2').modal('hide');
						reset();
						scoreCard(false);
					}, 1311);
				} else {
					var i;
					for (i = 1; i < 10; i++) {
						if (clicked.indexOf(i) < 0)
							break;
					}
					$(".box" + i).html(aiPlayer);
					//anouncing draw
					$('#myModal3').modal('show');
					setTimeout(function () {
						$('#myModal3').modal('hide');
						reset();
						scoreCard(true);
					}, 1311);
				}

			}
			// end all five ai inputs....
		} else {
			return false;
		}

	});

});