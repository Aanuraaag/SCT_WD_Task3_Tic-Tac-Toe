🎮 Tic-Tac-Toe Web Game

A responsive Tic-Tac-Toe game built using HTML, CSS, and JavaScript, featuring PvP and AI modes, difficulty levels, sound effects, and a persistent leaderboard using localStorage.

✨ Features

🕹 Game Modes: Player vs Player (PvP) and Player vs AI

🎯 AI Difficulty Levels: Easy, Medium, Hard

🏆 Leaderboard: Tracks wins, losses, and draws; data saved in localStorage

🔊 Sound Effects: Separate sounds for X and O moves, plus win, loss, and draw

🎨 Visual Feedback: Winning combination highlighted with animations

🌙 Theme Support: Remembers light/dark mode across sessions

🔄 Reset Options: Restart the board 



🛠 Installation

Clone or download the repository:

git clone https://github.com/Aanuraaag/SCT_WD_Task3_Tic-Tac-Toe


Open index.html in a browser.

Ensure the sounds folder with all .wav files is present, or update paths in script.js.

🎮 How to Play

⚙️ Select Game Mode: Choose PvP or AI from the dropdown.

🎚 Set Difficulty: Select easy, medium, or hard (only for AI mode).

🖱 Make Moves: Click empty cells to place X or O.

🏅 Leaderboard: Automatically updates after each game.

🔁 Restart Game: Click the Restart button to reset the board.

🧹 Reset Leaderboard: Click the Reset Leaderboard button to clear scores (with confirmation).

📁 File Structure
tic-tac-toe/
│
├── index.html        # Main HTML file
├── style.css         # Game styling
├── script.js         # Game logic
├── sounds/           # Sound effects
│   ├── move_x.mp3
│   ├── move_o.mp3
│   ├── win.mp3
│   ├── lose.mp3
│   └── draw.mp3
└── README.md         # Project documentation

🛠 Technologies Used

🌐 HTML5

🎨 CSS3 (Flexbox, Animations)

💻 JavaScript (ES6)

💾 Browser localStorage for persistent leaderboard

📜 License

This project is free to use for educational purposes.