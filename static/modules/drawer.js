import { game } from "modules/game";
import { BOARD_WIDTH, BOARD_HEIGHT } from "const";

export class Drawer {
  #canvas;
  #ctx;
  #backgroundImage = new Image();

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#backgroundImage.src = "gfx/grass.png";
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  drawBounds() {
    this.#ctx.beginPath();

    this.#ctx.strokeStyle = "#4d935f";
    this.#ctx.lineWidth = 10;

    this.#ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  }

  drawBackground() {
    this.#ctx.save();
    this.#ctx.rect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    this.#ctx.clip();
    this.#ctx.drawImage(this.#backgroundImage, 0, 0);
    this.#ctx.restore();
  }

  drawSnake() {
    if (!game.snake) return;

    game.snake.body.forEach(({ x, y }) => {
      if (!x || !y) return;
      this.#ctx.beginPath();
      this.#ctx.fillStyle = "#454545";
      this.#ctx.fillRect(x, y, game.snake.size, game.snake.size);
    });
  }

  drawApple() {
    this.#ctx.beginPath();

    this.#ctx.drawImage(
      game.apple.sprite,
      game.apple.x,
      game.apple.y,
      game.apple.size,
      game.apple.size
    );
  }
}
