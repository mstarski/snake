import { Snake } from "modules/snake";
import { Apple } from "modules/apple";
import { BOARD_HEIGHT, BOARD_WIDTH } from "const";
import { getDistance, randInt } from "./utils.mjs";

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
    this.spawnSnake();
    this.spawnApple();

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
    let x, y;

    while (true) {
      x = randInt(20, BOARD_WIDTH - this.snake.size);
      y = randInt(20, BOARD_HEIGHT - this.snake.size);

      const collidesWithSnake = this.snake.body.some(
        (part) => part.x === x && part.y === y
      );

      if (!collidesWithSnake) {
        break;
      }
    }

    this.apple = new Apple(x, y);
  }

  detectOutOfBounds() {
    const { x, y } = this.snake.head;
    const distanceX = BOARD_WIDTH - x;
    const distanceY = BOARD_HEIGHT - y;

    if (distanceX >= BOARD_WIDTH || distanceX <= this.snake.size) {
      this.makeOver();
    } else if (distanceY >= BOARD_HEIGHT || distanceY <= this.snake.size) {
      this.makeOver();
    }
  }

  detectAppleEaten() {
    const distance = getDistance(
      this.snake.head.x,
      this.snake.head.y,
      this.apple.x,
      this.apple.y
    );

    const isEaten = distance <= this.apple.size / 2 + this.snake.size / 2;
    if (!isEaten) return;

    this.snake.increaseLength();
    this.snake.increaseSpeed();
    this.spawnApple();

    this.points += 1;
  }
}

const game = new Game();
export { game };
