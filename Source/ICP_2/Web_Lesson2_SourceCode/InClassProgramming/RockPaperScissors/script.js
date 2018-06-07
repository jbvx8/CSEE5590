var choices = ["rock", "paper", "scissors"];
var buttons = document.getElementsByClassName("btn");

function getComputerChoice() {
    return choices[Math.floor(Math.random()*choices.length)];
}

function printTie(userChoice, computerChoice) {
    // document.getElementById("result").innerHTML = "";
    document.getElementById("result").innerHTML = "You Tied! You chose " + userChoice + " and the computer chose " + computerChoice + ".";
}

function printWin(userChoice, computerChoice) {
    // document.getElementById("result").innerHTML = "";
    document.getElementById("result").innerHTML = "You Win! You chose " + userChoice + " and the computer chose " + computerChoice + ".<br>" +
        userChoice + " beats " + computerChoice;
}

function printLose(userChoice, computerChoice) {
    // document.getElementById("result").innerHTML = "";
    document.getElementById("result").innerHTML = "You Lose! You chose " + userChoice + " and the computer chose " + computerChoice + ".<br>" +
        computerChoice + " beats " + userChoice;
}

function calculateWinner(userChoice) {
    var computerChoice = getComputerChoice();

    switch (userChoice) {
        case "rock":
        {
            switch (computerChoice) {
                case "rock": {
                    printTie("rock", "rock"); break;
                }
                case "paper": {
                    printLose("rock", "paper"); break;
                }
                case "scissors": {
                    printWin("rock", "scissors"); break;
                }
            } break;
        }
        case "paper":
        {
            switch (computerChoice) {
                case "rock": {
                    printWin("paper", "rock"); break;
                }
                case "paper": {
                    printTie("paper", "paper"); break;
                }
                case "scissors": {
                    printLose("paper", "scissors"); break;
                }
            } break;
        }
        case "scissors":
        {
            switch (computerChoice) {
                case "rock": {
                    printLose("scissors", "rock"); break;
                }
                case "paper": {
                    printWin("scissors", "paper"); break;
                }
                case "scissors": {
                    printTie("scissors", "scissors"); break;
                }
            } break;
        }
    }
}

