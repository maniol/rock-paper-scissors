'use strict';



var getComputerMove = function (){
	var randomResult=Math.floor((Math.random() * 3) + 1);
	console.log(randomResult);
	switch(randomResult) {
		case 1:
			return "paper";
		case 2:
			return"rock";
		case 3:
			return "scissors";
	}
}

var publishResults = function(draw, userWinner, userMove, computerMove) {
	if (draw) { output.insertAdjacentHTML('afterend',"It's a DRAW!<br>");}
	else if (userWinner) {output.insertAdjacentHTML('afterend',"You WIN! You played "+userMove+" and computer played "+computerMove+"<br>");}
  else { output.insertAdjacentHTML('afterend',"You LOSE! You played "+userMove+" and computer played "+computerMove+"<br>");}
}
var playerMove = function(move) {
	console.log(move);
	var output = document.getElementById('output');
	var userWinner = false;
	var draw = false;
	var computerMove =  getComputerMove();
	console.log(computerMove);
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
  publishResults(draw, userWinner, move, computerMove);
}

var buttonRock = document.getElementById("rock");
var buttonPaper = document.getElementById("paper");
var buttonScissors = document.getElementById("scissors");


buttonRock.addEventListener('click', playerMove('rock'));
buttonPaper.addEventListener('click', playerMove('paper'));
buttonScissors.addEventListener('click', playerMove('scissors'));