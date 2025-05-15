// Variáveis globais
const board = document.getElementById("board");
const statusText = document.getElementById("status");

let playerX = "Jogador X";
let playerO = "Jogador O";
let versusBot = false;

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Sons
const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.mp3");

// Cria o tabuleiro na tela
function createBoard() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.textContent = value;
    cell.addEventListener("click", cellClicked);
    board.appendChild(cell);
  });
  updateStatus();

  // Se for vez do bot, já chama ele
  if (versusBot && currentPlayer === "O" && !gameOver) {
    botMove();
  }
}

// Função ao clicar numa célula
function cellClicked(e) { function cellClicked(e) {
  const index = e.target.dataset.index;
  if (cells[index] || gameOver) return;

  clickSound.play();

  // Animação clique
  e.target.classList.add("clicked");
  setTimeout(() => e.target.classList.remove("clicked"), 300);

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    winSound.play();
    const winnerName = currentPlayer === "X" ? playerX : playerO;
    statusText.textContent = `🎉 ${winnerName} venceu!`;
    highlightWinnerCells();
    updateScore(currentPlayer);
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    drawSound.play();
    statusText.textContent = "Empate!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
    if (versusBot && currentPlayer === "O") botMove();
  }
}

  const index = e.target.dataset.index;
  if (cells[index] || gameOver) return;

  clickSound.play();

  e.target.classList.add("clicked");
  setTimeout(() => e.target.classList.remove("clicked"), 300);

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    winSound.play();
    const winnerName = currentPlayer === "X" ? playerX : playerO;
    statusText.textContent = `🎉 ${winnerName} venceu!`;
    highlightWinnerCells();
    updateScore(currentPlayer);
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    drawSound.play();
    statusText.textContent = "Empate!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();

  if (versusBot && currentPlayer === "O" && !gameOver) {
    botMove();
  }
}

// Verifica se alguém ganhou
function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index] === currentPlayer);
  });
}

// Destaca as células vencedoras
function highlightWinnerCells() {
  const winningPattern = winPatterns.find(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
  if (winningPattern) {
    winningPattern.forEach(index => {
      const cellDiv = board.querySelector(`[data-index='${index}']`);
      cellDiv.classList.add("winner");
    });
  }
}

// Atualiza o placar com animação
function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    const scoreEl = document.getElementById("scoreX");
    scoreEl.textContent = scoreX;
    scoreEl.classList.add("updated");
    setTimeout(() => scoreEl.classList.remove("updated"), 1000);
  } else {
    scoreO++;
    const scoreEl = document.getElementById("scoreO");
    scoreEl.textContent = scoreO;
    scoreEl.classList.add("updated");
    setTimeout(() => scoreEl.classList.remove("updated"), 1000);
  }
}

// Atualiza o texto do status da vez
function updateStatus() {
  const currentName = currentPlayer === "X" ? playerX : playerO;
  statusText.textContent = `Vez de: ${currentName}`;
}

// Reseta o jogo para começar outra partida
function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  // Remove classe de vencedor das células
  document.querySelectorAll(".cell.winner").forEach(cell => {
    cell.classList.remove("winner");
  });

  createBoard();if (versusBot && currentPlayer === "O") botMove();

}

// Movimento do bot (simples aleatório)
function botMove() {
  if (gameOver) return;

  setTimeout(() => {
    let emptyIndexes = cells
      .map((cell, index) => cell === "" ? index : null)
      .filter(i => i !== null);

    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    if (randomIndex !== undefined) {
      const cellDiv = board.querySelector(`[data-index='${randomIndex}']`);
      cellDiv.click();
    }
  }, 500);
}

// Função para começar o jogo com nomes e modo
function startGame() {
  const inputX = document.getElementById("playerX");
  const inputO = document.getElementById("playerO");
  const vsBotCheckbox = document.getElementById("vsBot");

  playerX = inputX.value.trim() || "Jogador X";
  playerO = inputO.value.trim() || "Jogador O";
  versusBot = vsBotCheckbox.checked;

  document.getElementById("nameX").textContent = playerX;
  document.getElementById("nameO").textContent = playerO;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "flex";

  resetGame();
}

// Inicialização: se você quiser, pode chamar createBoard() aqui, mas no startGame já chama resetGame e cria tabuleiro

function highlightWinnerCells() {
  const winningPattern = winPatterns.find(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
  if (winningPattern) {
    winningPattern.forEach(index => {
      const cellDiv = board.querySelector(`[data-index='${index}']`);
      cellDiv.classList.add("winner");
    });
  }
}

