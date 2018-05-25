'use strict';

/*global variables*/
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

var publishResults = function(draw, userWinner, userMove, computerMove, gameOver) {
	if (draw) { output.innerHTML = "It's a DRAW!<br>";}
	else if (userWinner) {
		output.innerHTML = "You WIN! You played "+userMove+" and computer played "+computerMove+"<br>";
		finalResultUser += 1;
	}
  else {
  	output.innerHTML = "You LOSE! You played "+userMove+" and computer played "+computerMove+"<br>";
  	finalResultComputer += 1;
  }
  result.innerHTML = finalResultUser+" : "+finalResultComputer+"<br>";
  if (gameOver){
  	if (finalResultUser > finalResultComputer) {
  		result.insertAdjacentHTML('beforeend',"YOU WON THE ENTIRE GAME!<br>");
  	}
  	else if (finalResultUser < finalResultComputer) {
  		result.insertAdjacentHTML('beforeend',"YOU LOSER!<br>");
  	}
		else {result.insertAdjacentHTML('beforeend', "YOU'RE BOTH WINNERS! IT'S A DRAW<br>");}
		result.insertAdjacentHTML('beforeend',"Game over, please press the new game button!");
  }
}
/*new game prompt function*/
function promptNewGame() {
	document.getElementById("rock").disabled = false;
	document.getElementById("paper").disabled = false;
	document.getElementById("scissors").disabled = false;
	result.innerHTML = "";
	output.innerHTML = "";
	var roundCounter = document.getElementById('roundCounter');
	maxRounds = prompt("Please provide the number of rounds in the match");
	console.log(maxRounds);
	if (maxRounds === null)
	{
		roundCounter.innerHTML = "Please press the new game button!";
		document.getElementById("rock").disabled = true;
		document.getElementById("paper").disabled = true;
		document.getElementById("scissors").disabled = true;
	}
	else { roundCounter.innerHTML = "This match has "+maxRounds+" rounds!"; }
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
	roundsCompleted += 1;
	console.log(roundsCompleted);
	console.log(maxRounds);
	if (roundsCompleted == maxRounds)
	{

		gameOver = true;
		roundsCompleted=0;
		document.getElementById("rock").disabled = true;
		document.getElementById("paper").disabled = true;
		document.getElementById("scissors").disabled = true;
		publishResults(draw, userWinner, move, computerMove, gameOver);
	}
	else { publishResults(draw, userWinner, move, computerMove, gameOver);}
}

/*event listeners*/

var buttonRock = document.getElementById("rock");
var buttonPaper = document.getElementById("paper");
var buttonScissors = document.getElementById("scissors");


buttonRock.addEventListener('click', function () { playerMove('rock') });
buttonPaper.addEventListener('click', function () { playerMove('paper') });
buttonScissors.addEventListener('click', function () { playerMove('scissors') });