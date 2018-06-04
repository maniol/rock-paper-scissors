'use strict';



var result =  document.getElementById('result');
var output = document.getElementById('output');


/*global variables - I put them here because different funcions need access to them*/
var params =  {
	finalResultPlayer: 0,
	finalResultComputer: 0,
	maxRounds: 0,
	roundsCompleted: 0,
	progress: []
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

var hideModal = function(event) 	{
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
	document.querySelector('.modal').classList.remove('show');
};	
	
var closeButtons = document.querySelectorAll('.modal .close');
	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	};

var getComputerMove = function() {
	var possiblePicks = ['paper', 'rock', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
};

var disableGameButtons = function(isDisabled) {
	buttonRock.disabled = isDisabled;
	buttonPaper.disabled = isDisabled;
	buttonScissors.disabled = isDisabled;
};

var updateTable = function(playerMove, computerMove, winnerIs) {
	var currentResults = {
		roundNumber: params.roundsCompleted,
		playerMove: playerMove,
		computerMove: computerMove,
		roundResult: winnerIs,
		currentGameResult: params.finalResultPlayer + ' : ' + params.finalResultComputer
	};
	params.progress.push(currentResults);
}

var generateTable = function() {
	var modalContent = document.querySelector('.content');
  var tbl = document.createElement('table');
  var trHeader = document.createElement('tr');
  for (var i = 0; i < 5; i++) {
  	var th = document.createElement('th');
  	trHeader.appendChild(th);
  };
  tbl.appendChild (trHeader);
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < params.progress.length; i++) {
  	var tr = document.createElement('tr');
    	for (var j = 0; j < 5; j++) {
      	var td = document.createElement('td');
        tr.appendChild(td)
      }
 			tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  modalContent.appendChild(tbl)
}

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
}
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
	updateTable(playerMove, computerMove, winnerIs);
	result.innerHTML = params.finalResultPlayer + ' : ' + params.finalResultComputer + '<br>';
	if (params.roundsCompleted == params.maxRounds) {
		disableGameButtons(true);
		generateTable();
		populateTable()
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
var handlePlayerMove = function(playerMove) {
	console.log(playerMove);
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
var buttonsAll = document.getElementsByClassName('player-move');
for (var i = 0; i < buttonsAll.length; i++) {
	var move = buttonsAll[i].getAttribute('data-move');
	console.log(move);
	buttonsAll[i].addEventListener('click', function() { handlePlayerMove(move) });
};

