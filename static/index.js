import { game } from "modules/game";
import { setControls } from "modules/controls";
import { BOARD_WIDTH, BOARD_HEIGHT } from "const";

console.log(BOARD_WIDTH, BOARD_HEIGHT);

const $ = (selector) => document.querySelector(selector);

/**
@type HTMLCanvasElement
*/
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBounds() {
  ctx.beginPath();

  ctx.strokeStyle = "#464646";
  ctx.lineWidth = 10;

  ctx.moveTo(0, 0);
  ctx.lineTo(0, BOARD_HEIGHT);
  ctx.lineTo(BOARD_WIDTH, BOARD_HEIGHT);
  ctx.lineTo(BOARD_WIDTH, 0);
  ctx.lineTo(0, 0);

  ctx.stroke();
}

function drawApple() {
  ctx.beginPath();

  ctx.drawImage(
    game.apple.sprite,
    game.apple.x,
    game.apple.y,
    game.apple.size,
    game.apple.size
  );
}

function drawSnake() {
  if (!game.snake) return;

  game.snake.body.forEach(({ x, y }) => {
    if (!x || !y) return;
    ctx.beginPath();
    ctx.fillStyle = "#454545";
    ctx.fillRect(x, y, game.snake.size, game.snake.size);
  });
}

function loop() {
  clear();
  drawBounds();
  drawSnake();

  if (game.started) {
    drawApple();
    game.snake.move(game.snake.size);

    game.detectOutOfBounds();
    game.detectAppleEaten();
  }

  requestAnimationFrame(loop);
}

(function main() {
  setControls();

  game.onPointsChanged = (value) => {
    const scoreEl = $("#score");
    scoreEl.textContent = value;
  };

  game.onStart = () => {
    const startScreenEl = $("#start-screen");
    startScreenEl.style.display = "none";
  };

  game.onOver = () => {
    const startScreenEl = $("#start-screen");
    startScreenEl.style.display = "block";
  };

  requestAnimationFrame(loop);
})();
