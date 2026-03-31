// --- Game Data (Multiple Levels) ---
const levels = [
    {
        title: "Level 1: The Awakening",
        puzzle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo"
    },
    {
        title: "Level 2: The Void",
        puzzle: "The more of this there is, the less you see. It consumes all light.",
        answer: "darkness"
    },
    {
        title: "Level 3: The Cipher",
        puzzle: "Decrypt the mainframe sequence: 2, 4, 8, 16, 32... What is the next integer?",
        answer: "64"
    }
];

let currentLevelIndex = 0;

const levelIndicator = document.getElementById("level-indicator");
const puzzleTitle = document.getElementById("puzzle-title");
const puzzleText = document.getElementById("puzzle-text");
const playerInput = document.getElementById("player-input");
const submitBtn = document.getElementById("submit-btn");
const chatHistory = document.getElementById("chat-history");

function loadLevel() {
    if (currentLevelIndex < levels.length) {
        const levelData = levels[currentLevelIndex];
        levelIndicator.innerText = `Level: ${currentLevelIndex + 1} // Active`;
        puzzleTitle.innerText = levelData.title;
        puzzleText.innerText = levelData.puzzle;
        playerInput.value = ""; 
    } else {
        puzzleTitle.innerText = "SYSTEM BREACHED";
        puzzleText.innerText = "Congratulations. You have successfully escaped the simulation.";
        playerInput.style.display = "none";
        submitBtn.style.display = "none";
        addSystemMessage("CRITICAL", "Security protocols bypassed. Shutting down.", "ai-msg");
    }
}

function addSystemMessage(sender, message, className) {
    const msgElement = document.createElement("p");
    msgElement.className = className;
    msgElement.innerHTML = `<strong>[${sender}]:</strong> ${message}`;
    chatHistory.appendChild(msgElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function checkAnswer() {
    const userAnswer = playerInput.value.trim().toLowerCase();
    const correctAnswer = levels[currentLevelIndex].answer;

    if (userAnswer === correctAnswer) {
        addSystemMessage("SYSTEM", `Passcode accepted. Advancing to Level ${currentLevelIndex + 2}.`, "system-msg");
        currentLevelIndex++;
        loadLevel();
    } else {
        addSystemMessage("SYSTEM", "ACCESS DENIED. Incorrect input.", "ai-msg");
        playerInput.style.borderColor = "red";
        setTimeout(() => playerInput.style.borderColor = "#00ffcc", 500);
    }
}

submitBtn.addEventListener("click", checkAnswer);

playerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Initialize game
loadLevel();
