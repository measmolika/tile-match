import './index.css';

const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;
let activeTiles = [];
let selectedTiles = [];

// Initialize the 3x3 grid
function createGrid() {
  gameContainer.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.addEventListener("click", handleTileClick);
    gameContainer.appendChild(tile);
  }
}

// Randomly select 3 tiles
function getRandomTiles() {
  const indices = Array.from({ length: 9 }, (_, i) => i);
  indices.sort(() => 0.5 - Math.random());
  return indices.slice(0, 3);
}

// Show the selected tiles in red
function highlightTiles() {
  activeTiles.forEach((index) => {
    const tile = document.querySelector(`.tile[data-index='${index}']`);
    tile.classList.add("red");
  });

  // Hide the tiles after 2 seconds
  setTimeout(() => {
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.classList.remove("red");
      tile.classList.add("hidden");
    });
  }, 2000);
}

// Handle tile clicks
function handleTileClick(e) {
  const index = parseInt(e.target.dataset.index);

  // If the tile is already selected, ignore
  if (selectedTiles.includes(index)) return;

  selectedTiles.push(index);

  // Check if the selection is correct
  if (!activeTiles.includes(index)) {
    alert("Wrong tile! Game over.");
    score = 0;
    resetGame();
    return;
  }

  // If all correct tiles are selected
  if (selectedTiles.length === activeTiles.length) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    resetGame();
  }
}

// Reset the game for the next round
function resetGame() {
  activeTiles = [];
  selectedTiles = [];
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("red", "hidden");
  });
  startGame();
}

// Start the game
function startGame() {
  createGrid();
  activeTiles = getRandomTiles();
  highlightTiles();
}

// Initialize the game on load
startGame();
