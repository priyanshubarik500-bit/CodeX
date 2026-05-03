// Get elements
let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let collectSound = new Audio("collect.mpeg");
let gameoversound = new Audio("gameover.mpeg");
let gameOverScreen = document.getElementById("gameOverScreen");
gameoversound.preload = "auto";
let objectTypes = [
  { name: "tree", points: 2, isBad: false },
  { name: "smoke", points: 0, isBad: true },
  { name: "anaar", points: 10, isBad: false },
  { name: "black", points: 0, isBad: true },
  { name: "kela", points: 3, isBad: false },
  { name: "mango", points: 5, isBad: false },
  { name: "can", points: 0, isBad: true },

];

// Game variables
let playerX = (gameArea.offsetWidth/2)-30;
let playerY= 50;
let score = 0;
let gameRunning = false;

// Move player with arrow keys
document.addEventListener("keydown", function(e) {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  }

  if (e.key === "ArrowRight" && playerX < gameArea.offsetWidth - player.offsetWidth) {
    playerX += 20;
  }

  player.style.left = playerX + "px";
});

// Create falling obstacles
function createObstacle() {
  let obstacle = document.createElement("div");
  
  let obj = objectTypes[Math.floor(Math.random() * objectTypes.length)];

  obstacle.classList.add(obj.name);

  let x = Math.floor(Math.random() * (gameArea.offsetWidth - 50));
  obstacle.style.left = x + "px";

  gameArea.appendChild(obstacle)

  let y = 0;

  let fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      obstacle.remove();
      return;
    }

    y += 5;
    obstacle.style.top = y + "px";

// Collision detection
  let playerRect = player.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();


  let paddingX = 25; 
  let paddingY = 30; 

  if (
    playerRect.left + paddingX < obstacleRect.right &&
    playerRect.right - paddingX > obstacleRect.left &&
    playerRect.top + paddingY < obstacleRect.bottom &&
    playerRect.bottom - paddingY > obstacleRect.top
  ) {
   
    if (obj.isBad) {
      endGame();}
       
     else {
      score += obj.points;
      scoreDisplay.innerText = "Score: " + score;

      collectSound.currentTime = 0; 
      collectSound.play();
    
  
      obstacle.remove();
      clearInterval(fall);
    }
  
  } 
  }, 50);
}

// Start the game
function startGame() {4
  gameRunning = true;
  score = 0;
  player.style.left = playerX + "px";
  player.style.bottom = playerY + "px";
  scoreDisplay.innerText = "Score: 0";

  // Create obstacles repeatedly
  let obstacleInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(obstacleInterval);
      return;
    }
    createObstacle();
  }, 1000);
}

// End the game
function endGame() {
  gameRunning = false;

  gameoversound.currentTime=0;
  gameoversound.play()

  gameOverScreen.style.display = "block";
}

gameOverScreen.addEventListener("click", () => {
  location.reload();
});