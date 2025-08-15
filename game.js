  
    (function () {
      const saved = localStorage.getItem("theme");
      if (saved) document.documentElement.setAttribute("data-theme", saved);
    })();

  
    // Hide difficulty selector when PvP is chosen
    const modeSel = document.getElementById('mode-select');
    const diffWrap = document.getElementById('difficulty-wrap');
    function toggleDifficulty() {
      diffWrap.style.display = modeSel.value === 'ai' ? 'inline-flex' : 'none';
    }
    modeSel.addEventListener('change', toggleDifficulty);
    toggleDifficulty();
  // ===== Game Variables =====
const board = document.querySelector(".board");
const statusText = document.querySelector(".status");
const restartBtn = document.getElementById("restart-btn");
const modeSelect = document.getElementById("mode-select");
const difficultySelect = document.getElementById("difficulty-select");
const leaderboardList = document.getElementById("leaderboard-list");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "ai";
let difficulty = "medium";
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || { X: 0, O: 0, draws: 0 };

// ===== Winning Combinations =====
const winCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
];

// ===== Init Game =====
function init() {
    board.innerHTML = "";
    cells.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.textContent = ""; // Ensure empty display
        cell.addEventListener("click", handleCellClick, { once: true });
        board.appendChild(cell);
    }
}
init();

// ===== Cell Click =====
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || cells[index] !== "") return;

    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("fade-in");
   // Play sound for the player’s move
    if (currentPlayer === "X") {
        playX();
    } else {
        playO();
    }
if (checkWin(currentPlayer)) {
    highlightWin(currentPlayer);   // Highlight winning cells

    if (currentPlayer === "X") {
        statusText.textContent = `Player X wins!`;
        playWin();                 // X wins sound
    } else {
        statusText.textContent = `Player O wins!`;
        playLose();                // X loses sound
    }

    updateLeaderboard(currentPlayer);
    gameActive = false;
    return;
}


    if (!cells.includes("")) {
        statusText.textContent = `It's a draw!`;
        updateLeaderboard("draws");
        playDraw();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    if (mode === "ai" && currentPlayer === "O" && gameActive) {
        setTimeout(aiMove, 500);
    }
}

// ===== AI Move =====
function aiMove() {
    let move;
    if (difficulty === "easy") {
        move = randomMove();
    } else if (difficulty === "medium") {
        move = Math.random() < 0.5 ? bestMove("O") : randomMove();
    } else {
        move = Math.random() < 0.9 ? bestMove("O") : randomMove();
    }

    cells[move] = "O";
    const cellElement = document.querySelector(`[data-index='${move}']`);
    cellElement.textContent = "O";
    cellElement.classList.add("fade-in");
    playO();
  if (checkWin("O")) {
    highlightWin("O");             // Highlight winning cells
    statusText.textContent = "Player O wins!";
    playLose();                    // X loses because AI (O) won
    updateLeaderboard("O");
    gameActive = false;
    return;
}


    if (!cells.includes("")) {
        statusText.textContent = `It's a draw!`;
        updateLeaderboard("draws");
        playDraw();
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// ===== Best Move =====
function bestMove(player) {
    for (let combo of winCombos) {
        let values = combo.map(i => cells[i]);
        if (values.filter(v => v === player).length === 2 && values.includes("")) {
            return combo[values.indexOf("")];
        }
    }
    let opponent = player === "X" ? "O" : "X";
    for (let combo of winCombos) {
        let values = combo.map(i => cells[i]);
        if (values.filter(v => v === opponent).length === 2 && values.includes("")) {
            return combo[values.indexOf("")];
        }
    }
    return randomMove();
}

// ===== Random Move =====
function randomMove() {
    let available = cells
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);
    return available[Math.floor(Math.random() * available.length)];
}

// ===== Win Check =====
function checkWin(player) {
    return winCombos.some(combo => combo.every(index => cells[index] === player));
}
function highlightWin(player) {
    const winningCombo = winCombos.find(combo => combo.every(i => cells[i] === player));
    if (winningCombo) {
        winningCombo.forEach(i => document.querySelector(`[data-index='${i}']`).classList.add("win-cell"));
    }
}


// ===== Leaderboard =====
function updateLeaderboard(winner) {
    leaderboard[winner]++;
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    renderLeaderboard();
}

function renderLeaderboard() {
    leaderboardList.innerHTML = `
        <li>Player X: ${leaderboard.X}</li>
        <li>Player O: ${leaderboard.O}</li>
        <li>Draws: ${leaderboard.draws}</li>
    `;
}
renderLeaderboard();



// ===== Event Listeners =====
restartBtn.addEventListener("click", init);
modeSelect.addEventListener("change", (e) => {
    mode = e.target.value;
    init();
});
difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    init();
});
const resetLeaderboardBtn = document.getElementById("reset-leaderboard-btn");

resetLeaderboardBtn.addEventListener("click", () => {
    // Reset leaderboard values
    leaderboard = { X: 0, O: 0, draws: 0 };
    
    // Update localStorage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    
    // Re-render leaderboard
    renderLeaderboard();
});
resetLeaderboardBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all scores?")) {
        leaderboard = { X: 0, O: 0, draws: 0 };
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        renderLeaderboard();
    }
});
