import { Snake } from "modules/snake";
import { Apple } from "modules/apple";
import { BOARD_HEIGHT, BOARD_WIDTH } from "const";
import { randInt } from "./utils.mjs";

class Game {
  #isStarted = false;
  #points = 0;

  // Game objects
  snake;
  apple;

  // Handlers
  onPointsChanged;
  onStart;
  onOver;

  get started() {
    return this.#isStarted;
  }

  get points() {
    return this.#points;
  }

  set points(value) {
    this.#points = value;
    this.onPointsChanged(value);
  }

  start() {
    if (this.#isStarted) return;

    this.#isStarted = true;

    this.points = 0;
    this.spawnApple();
    this.spawnSnake();

    this.onStart();
  }

  makeOver() {
    this.#isStarted = false;

    this.onOver();
  }

  spawnSnake() {
    this.snake = new Snake(400, 300);
    this.snake.onCollision = () => this.makeOver();
  }

  spawnApple() {
    this.apple = new Apple(
      randInt(20, BOARD_WIDTH - 20),
      randInt(20, BOARD_HEIGHT - 20)
    );
  }

  detectOutOfBounds() {
    if (
      this.snake.head.x >= BOARD_WIDTH ||
      this.snake.head.x <= 0 ||
      this.snake.head.y >= BOARD_HEIGHT ||
      this.snake.head.y <= 0
    ) {
      this.makeOver();
    }
  }

  detectAppleEaten() {
    const deltaX = Math.abs(this.snake.head.x - this.apple.x);
    const deltaY = Math.abs(this.snake.head.y - this.apple.y);

    const isEaten = deltaX >= 0 && deltaX <= 15 && deltaY >= 0 && deltaY <= 15;
    if (!isEaten) return;

    this.snake.increaseLength();
    this.snake.increaseSpeed();
    this.spawnApple();

    this.points += 1;
  }
}

const game = new Game();
export { game };
