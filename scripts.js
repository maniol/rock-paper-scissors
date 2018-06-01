'use strict';

/*event listeners*/

var buttonRock = document.getElementById('rock');
var buttonPaper = document.getElementById('paper');
var buttonScissors = document.getElementById('scissors');
var buttonsAll = document.getElementsByClassName('player-move');
for (var i = 0; i < buttonsAll.length; i++) { // why it doesn't work (for (var btn in buttons))
	var move = buttonsAll[i].getAttribute('id');
	buttonsAll[i].addEventListener('click', function () { playerMove(move) });
};

var result =  document.getElementById('result');
var output = document.getElementById('output');


/*global variables - I put them here because different funcions need access to them*/
var params =  {
	finalResultPlayer: 0,
	finalResultComputer: 0,
	maxRounds: 0,
	roundsCompleted: 0
};

/*aux functions*/

var showModal = function(message) {
	document.querySelector('#modal-overlay').classList.add('show');
		/*event.preventDefault();
		var allModals = document.querySelectorAll('.modal');*/
		var modal = document.getElementById('modal-results');
		/*for ( var i = 0; i < allModals.length; i++) { /*why for (modal in allModals) didnt work?
			allModals[i].classList.remove('show');
			}	*/
		modal.classList.add('show');
		modal.getElementsByTagName('p')[0].innerHTML = message;
};

var hideModal = function(event) {
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
	document.querySelector('.modal').classList.remove('show');
};	
	
var closeButtons = document.querySelectorAll('.modal .close');
	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	};

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
		params.finalResultPlayer++;
		params.roundsCompleted++;
	} else {
		output.innerHTML = 'You LOSE! You played ' + playerMove + ' and computer played ' + computerMove + '<br>';
		params.finalResultComputer++;
		params.roundsCompleted++;
	}
	result.innerHTML = params.finalResultPlayer + ' : ' + params.finalResultComputer + '<br>';
	if (params.roundsCompleted == params.maxRounds) {
		disableGameButtons(true);
		if (params.finalResultPlayer > params.finalResultComputer) {
			showModal('YOU WON THE ENTIRE GAME!<br>');
		} else if (params.finalResultPlayer < params.finalResultComputer) {
			showModal('YOU LOSER!<br>');
		} else {
			showModal('YOU\'RE BOTH WINNERS! IT\'S A DRAW!<br>');
		}
	params.roundsCompleted = 0;
	params.finalResultComputer = 0;
	params.finalResultPlayer = 0;
	result.insertAdjacentHTML('beforeend',"Game over, please press the new game button!");
	}
};

/*new game button handler*/
function promptNewGame() {
	result.innerHTML = '';
	output.innerHTML = '';
	var roundCounter = document.getElementById('roundCounter');
	params.maxRounds = prompt('Please provide the number of rounds in the match');
	if (params.maxRounds === null || params.maxRounds === '') {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Please press the new game button and choose the number of rounds!';
	} else if (isNaN(params.maxRounds)) {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Invalid input! Please provide a number.';
	} else {
		roundCounter.innerHTML = 'This match has ' + params.maxRounds + ' rounds!';
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

