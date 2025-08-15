// sound.js

function playX() {
    document.getElementById("x-sound").play().catch(() => {});
}

function playO() {
    document.getElementById("o-sound").play().catch(() => {});
}

function playWin() {
    document.getElementById("win-sound").play().catch(() => {});
}

function playDraw() {
    document.getElementById("draw-sound").play().catch(() => {});
}
function playLose() {
    document.getElementById("lose-sound").play().catch(() => {});
}
