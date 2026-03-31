// --- Game Data & Mechanics ---
const levels = [
    {
        title: "Chamber I: The Gate of Glyphs",
        // Using HTML to render larger symbols/emoji for the puzzle
        htmlContent: `
            <div class="hieroglyphs">🦁 🦉 🪲</div>
            <p>The beasts guard the numeric code.</p>
            <p>The predator walks, the watcher flies, the sacred rolls.</p>
        `,
        answer: "427",
        relicReward: "🏺 Canopic Jar"
    },
    {
        title: "Chamber II: The Scales of Maat",
        htmlContent: `
            <div class="hieroglyphs">⚖️</div>
            <p>The feather of truth weighs 11 measures.</p>
            <p>You place weights of 5 and 3 on the opposite scale. What singular weight remains to balance your soul?</p>
        `,
        answer: "3",
        relicReward: "🧿 Scarab Amulet"
    },
    {
        title: "Chamber III: The Sphinx's Sequence",
        htmlContent: `
            <div class="hieroglyphs">🌅 ☀️ 🏜️</div>
            <p>A creature changes its steps as the sun crosses the sky.</p>
            <p>Enter the sequence of its footfalls: Morning, Noon, and Evening.</p>
        `,
        answer: "423",
        relicReward: "☥ The Golden Ankh"
    }
];

// --- Variables ---
let currentLevelIndex = 0;
let score = 0;
let currentLevelPoints = 1000; // Max points per level
const penalty = 150; // Points lost per wrong guess
let discoveredRelics = [];

// --- DOM Elements ---
const levelIndicator = document.getElementById("level-indicator");
const scoreDisplay = document.getElementById("score-display");
const relicsList = document.getElementById("relics-list");
const puzzleTitle = document.getElementById("puzzle-title");
const puzzleContent = document.getElementById("puzzle-content");
const playerInput = document.getElementById("player-input");
const submitBtn = document.getElementById("submit-btn");
const chatHistory = document.getElementById("chat-history");

// --- Functions ---

function loadLevel() {
    if (currentLevelIndex < levels.length) {
        const levelData = levels[currentLevelIndex];
        currentLevelPoints = 1000; // Reset potential points for new level
        
        // Roman numerals for chamber
        const numerals = ["I", "II", "III", "IV"];
        levelIndicator.innerText = `Chamber: ${numerals[currentLevelIndex]}`;
        
        puzzleTitle.innerText = levelData.title;
        puzzleContent.innerHTML = levelData.htmlContent; // Inject HTML puzzle
        playerInput.value = ""; 
    } else {
        // Game Won State
        puzzleTitle.innerText = "THE TOMB IS OPEN";
        puzzleContent.innerHTML = `
            <div class="hieroglyphs">☀️</div>
            <p>You have survived the trial and claimed the Sun King's treasure.</p>
            <p>Final Score: ${score}</p>
        `;
        playerInput.style.display = "none";
        submitBtn.style.display = "none";
        addSystemMessage("EXPEDITION LOG", "Sunlight detected. Exit path clear.", "system-msg");
    }
}

function updateScoreboard() {
    scoreDisplay.innerText = `Score: ${score}`;
    if (discoveredRelics.length > 0) {
        relicsList.innerText = discoveredRelics.join(" | ");
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
    const currentLevel = levels[currentLevelIndex];
    const correctAnswer = currentLevel.answer;

    if (userAnswer === correctAnswer) {
        // Correct Answer Logic
        score += currentLevelPoints;
        discoveredRelics.push(currentLevel.relicReward);
        
        addSystemMessage("EXPEDITION LOG", `Mechanism unlocked. Relic acquired: ${currentLevel.relicReward}`, "system-msg");
        updateScoreboard();
        
        currentLevelIndex++;
        loadLevel();
    } else {
        // Wrong Answer Logic
        currentLevelPoints = Math.max(0, currentLevelPoints - penalty); // Deduct points, don't go below 0
        addSystemMessage("EXPEDITION LOG", "WARNING: Incorrect code. Trap mechanism shifting. Point penalty applied.", "ai-msg");
        
        // Shake animation effect
        playerInput.style.borderColor = "#ff3333";
        playerInput.style.transform = "translateX(5px)";
        setTimeout(() => {
            playerInput.style.transform = "translateX(-5px)";
            setTimeout(() => {
                playerInput.style.transform = "translateX(0)";
                playerInput.style.borderColor = "#d4af37";
            }, 100);
        }, 100);
    }
}

// --- Event Listeners ---
submitBtn.addEventListener("click", checkAnswer);

playerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Initialize game
loadLevel();
updateScoreboard();
