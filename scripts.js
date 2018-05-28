'use strict';

/*global variables - I put them here because different funcions need access to them*/
var finalResultUser = 0;
var finalResultComputer = 0;
var maxRounds = 0;
var roundsCompleted = 0;
var result = document.getElementById('result');
var output = document.getElementById('output');

/*aux functions*/
var getComputerMove = function (){
	var randomResult = Math.floor((Math.random() * 3) + 1);
	switch(randomResult) {
		case 1:
			return "paper";
		case 2:
			return"rock";
		case 3:
			return "scissors";
	}
}

var disableGameButtons = function (bool) {
	document.getElementById("rock").disabled = bool;
	document.getElementById("paper").disabled = bool;
	document.getElementById("scissors").disabled = bool;
}


var publishResults = function(draw, userWinner, userMove, computerMove, gameOver) {
	if (draw) { output.innerHTML = "It's a DRAW!<br>";}
	else if (userWinner) {
		output.innerHTML = "You WIN! You played " + userMove + " and computer played " + computerMove + "<br>";
		finalResultUser += 1;
	}
  else {
  	output.innerHTML = "You LOSE! You played " + userMove + " and computer played " + computerMove + "<br>";
  	finalResultComputer += 1;
  }
  result.innerHTML = finalResultUser + " : " + finalResultComputer + "<br>";
  if (gameOver){
  	if (finalResultUser > finalResultComputer) {
  		result.insertAdjacentHTML('beforeend',"YOU WON THE ENTIRE GAME!<br>");
  	}
  	else if (finalResultUser < finalResultComputer) {
  		result.insertAdjacentHTML('beforeend',"YOU LOSER!<br>");
  	}
		else {
			result.insertAdjacentHTML('beforeend', "YOU'RE BOTH WINNERS! IT'S A DRAW!<br>");
		}
		result.insertAdjacentHTML('beforeend',"Game over, please press the new game button!");
		disableGameButtons(true);
  }
}

/*new game button handler*/
function promptNewGame() {
	result.innerHTML = "";
	output.innerHTML = "";
	var roundCounter = document.getElementById('roundCounter');
	maxRounds = prompt("Please provide the number of rounds in the match");
	if (maxRounds === null) {
		disableGameButtons(true);
		roundCounter.innerHTML = "Please press the new game button and choose the number of rounds!";
	}
	else if (maxRounds === "") {
		disableGameButtons(true);
		roundCounter.innerHTML = "Please press the new game button and choose the number of rounds!";
	}
	else if (isNaN(maxRounds)){
		disableGameButtons(true);
		roundCounter.innerHTML = "Invalid input! Please provide a number.";
	}
	else {
		roundCounter.innerHTML = "This match has " + maxRounds + " rounds!";
		finalResultComputer=0;
		finalResultComputer=0;
		disableGameButtons(false);
	}
}

/*main*/
var playerMove = function(move) {
	var userWinner = false;
	var draw = false;
	var gameOver = false;
	var computerMove =  getComputerMove();
	switch(computerMove) {
		case 'paper':
	  	if (move == 'paper') { draw = true;}
	  	else if (move == 'rock') {userWinner = false;}
	  	else { userWinner = true;}
	    break;
	  case 'rock':
	  	if (move == 'rock') { draw = true;}
	  	else if (move == 'paper') {userWinner = true;}
	  	else { userWinner = false;}
	    break;
	  case 'scissors':
	  	if (move == 'scissors') { draw = true;}
	  	else if (move == 'stone') {userWinner = true;}
	  	else { userWinner = false;}
	  }
	if(!draw) {
		roundsCompleted += 1;
	}
	if (roundsCompleted == maxRounds)
	{
		gameOver = true;
		roundsCompleted=0;
		disableGameButtons(true);
	}
	publishResults(draw, userWinner, move, computerMove, gameOver);
}

/*event listeners*/

var buttonRock = document.getElementById("rock");
var buttonPaper = document.getElementById("paper");
var buttonScissors = document.getElementById("scissors");


buttonRock.addEventListener('click', function () { playerMove('rock') });
buttonPaper.addEventListener('click', function () { playerMove('paper') });
buttonScissors.addEventListener('click', function () { playerMove('scissors') });