'use strict';

/*global variables*/
var params = {
	playerName: '',
	finalResultPlayer: 0,
	finalResultComputer: 0,
	maxRounds: 0,  // no of rounds that need to have a winner for the game to finish; set by the user
	roundsWithWinner: 0, 
	roundsCompleted: 0, // rounds with winner + draws
	progress: [] // for storing result tables after each round
};

var resultTableColNumber = 5;
/*get elements*/
var result = document.getElementById('result');
var output = document.getElementById('output');

/*event listeners*/
var buttonRock = document.getElementById('rock');
var buttonPaper = document.getElementById('paper');
var buttonScissors = document.getElementById('scissors');
var buttonsAll = document.getElementsByClassName('player-move');
var closeButtons = document.querySelectorAll('.modal .close');

/*show and hide modals*/
var showResultsModal = function(message) {
	document.querySelector('#modal-overlay-results').classList.add('show');
	var modalResults = document.getElementById('modal-results');
	modalResults.getElementsByTagName('p')[0].innerHTML = message;
	modalResults.classList.add('show');
};

var showStartModal = function() {
	document.querySelector('#modal-overlay-start').classList.add('show');
	var modalStart = document.getElementById('modal-start');
	modalStart.classList.add('show');
};

var hideModal = function() {
	var overlays = document.querySelectorAll('.overlay');
	for (var i = 0; i < overlays.length; i++) {
		overlays[i].classList.remove('show');
	}
	var modals = document.querySelectorAll('.modal');
	for (var i = 0; i < modals.length; i++) {
		modals[i].classList.remove('show');
	}
};	

/*disable game buttons*/	

var disableGameButtons = function(isDisabled) {
	buttonRock.disabled = isDisabled;
	buttonPaper.disabled = isDisabled;
	buttonScissors.disabled = isDisabled;
};

/* table functions*/

var updateTable = function(playerMove, computerMove, winnerIs) {
	var currentResults = {
		roundNumber: params.roundsCompleted,
		playerMove: playerMove,
		computerMove: computerMove,
		roundResult: winnerIs,
		currentGameResult: params.finalResultPlayer + ' : ' + params.finalResultComputer
	};
	params.progress.push(currentResults);
};

var generateTable = function() {
	var modalContent = document.querySelector('.results');
	var table = document.createElement('table');
	var trHeader = document.createElement('tr');
	for (var i = 0; i < resultTableColNumber; i++) { // nie jasne jest co to jest  zadeklaruj consty np number of columns
		var th = document.createElement('th');
		trHeader.appendChild(th);
	}
	table.appendChild (trHeader);
	var tableBody = document.createElement('tbody'); 
	for (var i = 0; i < params.progress.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < 5; j++) {
			var td = document.createElement('td');
			tr.appendChild(td)
		}
		tableBody.appendChild(tr);
	}
	table.appendChild(tableBody);
	modalContent.appendChild(table)
};

var deleteTable = function() {
	var tableParent = document.querySelector('.results');
	var table = document.querySelector('table');
	tableParent.removeChild(table);
};

var populateTable = function() {
	var headerNames = ['Round No', 'Player Move', 'Comuter Move', 'Round Winner', 'Current Game Result'];
	var headerCells = document.querySelectorAll('table tr th');
	for (var i = 0; i <  headerCells.length; i++) {
		headerCells[i].innerHTML = headerNames[i];
	}
	var tableRows = document.querySelectorAll('tbody tr');
	for ( var i = 0; i < tableRows.length; i++ ) {
		var keyList = ['roundNumber', 'playerMove', 'computerMove', 'roundResult', 'currentGameResult'];
		var rowCells = tableRows[i].querySelectorAll('td');
		for (var j = 0; j < rowCells.length; j ++) {
			for ( var k = 0; k < keyList.length; k++) {
				rowCells[j].innerHTML = params.progress[i][keyList[k]];
				break;
			}
			keyList.shift();
		}
	}
};

/*handle result*/
var publishResults = function(winnerIs, computerMove, playerMove) {
	if (winnerIs === 'none') {
		output.innerHTML = 'It\'s a DRAW!<br>';
		params.roundsCompleted++;
	} else if (winnerIs === 'player') {
		output.innerHTML = params.playerName + ' WINS! ' + params.playerName + ' played ' + playerMove + ' and computer played ' + computerMove + '<br>';
		params.finalResultPlayer++;
		params.roundsWithWinner++;
		params.roundsCompleted++;
	} else {
		output.innerHTML = params.playerName + ' LOSES! ' + params.playerName + ' played  ' + playerMove + ' and computer played ' + computerMove + '<br>';
		params.finalResultComputer++;
		params.roundsWithWinner++;
		params.roundsCompleted++;
	}
	updateTable(playerMove, computerMove, winnerIs);
	result.innerHTML = params.finalResultPlayer + ' : ' + params.finalResultComputer + '<br>';
	if (params.roundsWithWinner == params.maxRounds) {
		disableGameButtons(true);
		generateTable();
		populateTable();
		if (params.finalResultPlayer > params.finalResultComputer) {
			showResultsModal('YOU WON THE ENTIRE GAME!<br>');
		} else if (params.finalResultPlayer < params.finalResultComputer) {
			showResultsModal('YOU LOSER!<br>');
		} else {
			showResultsModal('YOU\'RE BOTH WINNERS! IT\'S A DRAW!<br>');
		}
	params.roundsWithWinner = 0;
	params.roundsCompleted = 0;
	params.finalResultComputer = 0;
	params.finalResultPlayer = 0;
	params.playerName = '';
	params.maxRounds = 0;
	params.progress = [];
	result.insertAdjacentHTML('beforeend',"Game over, please press the new game button!");
	}
};

/*get computer move*/
var getComputerMove = function() {
	var possiblePicks = ['paper', 'rock', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
};

/*handle player move*/
var handlePlayerMove = function(playerMove) {
	var computerMove = getComputerMove();
	var winnerIs = 'player';
	if (computerMove === 'scissors' && playerMove === 'paper' || 
		computerMove === 'rock' && playerMove === 'scissors' ||
		computerMove === 'paper' && playerMove === 'rock' ) {
			winnerIs = 'computer';
	} else if (computerMove === playerMove) {
		winnerIs = 'none';
	}
	publishResults(winnerIs, computerMove, playerMove);
};

/*start new game onclick*/
function startNewGame(event) {
	var isTable = document.querySelector('table');
	if (isTable !== null) {
		deleteTable();
	}
	event.preventDefault();
	result.innerHTML = '';
	output.innerHTML = '';
	var roundCounter = document.getElementById('roundCounter');
	params.playerName = document.getElementById('name').value;
	params.maxRounds = document.getElementById('turns').value;
	hideModal();
	if (params.maxRounds === null || params.maxRounds === '') {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Please press the new game button and choose the number of rounds!';
	} else if (isNaN(params.maxRounds)) {
		disableGameButtons(true);
		roundCounter.innerHTML = 'Invalid input! Please provide a number equal or greater than 1.';
	} else {
		roundCounter.innerHTML = 'This match has ' + params.maxRounds + ' rounds!';
		disableGameButtons(false);
	}
};

for (var i = 0; i < buttonsAll.length; i++) {
	let move = buttonsAll[i].getAttribute('data-move');
	buttonsAll[i].addEventListener('click', function() { handlePlayerMove(move) });
}

for (var i = 0; i < closeButtons.length; i++) {
	closeButtons[i].addEventListener('click', function() { hideModal() });
}