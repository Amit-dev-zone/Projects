const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],     // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],     // columns
  [0, 4, 8], [2, 4, 6]                 // diagonals
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      status.textContent = `${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) {
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);

status.textContent = `Player ${currentPlayer}'s turn`;
                               