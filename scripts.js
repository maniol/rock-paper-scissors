'use strict';

/*global variables - I put them here because different funcions need access to them*/
var finalResultPlayer = 0;
var finalResultComputer = 0;
var maxRounds = 0;
var roundsCompleted = 0;
var result = document.getElementById('result');
var output = document.getElementById('output');

/*aux functions*/
var getComputerMove = function () {
	var possiblePicks = ['paper', 'rock', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
};

var disableGameButtons = function (isDisabled) {
	buttonRock.disabled = isDisabled;
	buttonPaper.disabled = isDisabled;
	buttonScissors.disabled = isDisabled;
};

var publishResults = function(winnerIs, computerMove, playerMove) {
	if (winnerIs === 'none') {
		output.innerHTML = 'It\'s a DRAW!<br>';
	} else if (winnerIs === 'player') {
		output.innerHTML = 'You WIN! You played ' + playerMove + ' and computer played ' + computerMove + '<br>';
		finalResultPlayer++;
		roundsCompleted++;
	} else {
		output.innerHTML = 'You LOSE! You played ' + playerMove + ' and computer played ' + computerMove + '<br>';
		finalResultComputer++;
		roundsCompleted++;
	}
	result.innerHTML = finalResultPlayer + ' : ' + finalResultComputer + '<br>';
	if (roundsCompleted == maxRounds) {
		disableGameButtons(true);
		if (finalResultPlayer > finalResultComputer) {
			result.insertAdjacentHTML('beforeend','YOU WON THE ENTIRE GAME!<br>');
		} else if (finalResultPlayer < finalResultComputer) {
			result.insertAdjacentHTML('beforeend','YOU LOSER!<br>');
		} else {
			result.insertAdjacentHTML('beforeend', 'YOU\'RE BOTH WINNERS! IT\'S A DRAW!<br>');
		}
	roundsCompleted = 0;
	finalResultComputer = 0;
	finalResultPlayer = 0;
	result.insertAdjacentHTML('beforeend',"Game over, please press the new game button!");
	}
};

/*new game button handler*/
function promptNewGame() {
	result.innerHTML = '';
	output.innerHTML = '';
	var roundCounter = document.getElementById('roundCounter');
	maxRounds = prompt('Please provide the number of rounds in the match');
	if (maxRounds === null || maxRounds === '') {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Please press the new game button and choose the number of rounds!';
	} else if (isNaN(maxRounds)) {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Invalid input! Please provide a number.';
	} else {
		roundCounter.innerHTML = 'This match has ' + maxRounds + ' rounds!';
		disableGameButtons(false);
	}
};

/*main*/
var playerMove = function(playerMove) {
	var computerMove =  getComputerMove();
	var winnerIs = 'player';
	if (computerMove === 'scissors' && playerMove === 'paper' ||
		  computerMove === 'rock' && playerMove === 'scissors' ||
		  computerMove === 'paper' && playerMove === 'rock' ) {
		winnerIs = 'computer';
	} else if (computerMove === playerMove) {
		winnerIs = 'none';
	}
	publishResults(winnerIs, playerMove, computerMove);
};

/*event listeners*/

var buttonRock = document.getElementById('rock');
var buttonPaper = document.getElementById('paper');
var buttonScissors = document.getElementById('scissors');


buttonRock.addEventListener('click', function () { playerMove('rock') });
buttonPaper.addEventListener('click', function () { playerMove('paper') });
buttonScissors.addEventListener('click', function () { playerMove('scissors') });