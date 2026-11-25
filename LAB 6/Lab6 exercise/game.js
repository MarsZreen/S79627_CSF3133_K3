// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Validates player name and starts the game session
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Started at: " + Date();
}

// Randomly selects rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round, updates images, score, result color, and history table
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images (.jpg)
    document.getElementById("playerImg").src = playerChoice + ".jpg";
    document.getElementById("computerImg").src = computerChoice + ".jpg";

    let outcome = "";
    const resultEl = document.getElementById("result");

    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        document.getElementById("draws").innerHTML = draws;
        resultEl.innerHTML = "Round " + roundCount + ": It's a Draw! Both chose " + playerChoice + ".";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        document.getElementById("wins").innerHTML = wins;
        resultEl.innerHTML = "Round " + roundCount + ": You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultEl.style.color = "green";
    } else {
        outcome = "Lose";
        losses++;
        document.getElementById("losses").innerHTML = losses;
        resultEl.innerHTML = "Round " + roundCount + ": You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultEl.style.color = "red";
    }

    results.push(outcome);

    // Append round entry to the history table
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
        "<td>" + roundCount + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + outcome + "</td>" +
        "</tr>";
}

// Counts wins with a for loop and displays total rounds and rounded win percentage
function showSummary() {
    let winTotal = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winTotal++;
        }
    }

    const totalRounds = results.length;
    const percentage = totalRounds === 0 ? 0 : Math.round((winTotal / totalRounds) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + totalRounds + " rounds and won " + percentage + "%.";
}

// Resets scores, history, summary, and result display
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];
    gameStarted = false;

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").style.color = "";
    document.getElementById("summaryText").innerHTML = "";
}
