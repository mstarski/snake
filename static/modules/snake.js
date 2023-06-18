import { UP, DOWN, LEFT, RIGHT } from "const";

export class Snake {
  #moveDelay = 20;
  #moveDelayTreshold = 10;
  #delayCounter = 0;

  #direction = UP;
  size = 24;
  body = [];

  onCollision;

  constructor(x, y) {
    this.body.push({ x, y });
  }

  get head() {
    return this.body[0];
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  get direction() {
    return this.#direction;
  }

  setDirection(direction) {
    if (![UP, DOWN, LEFT, RIGHT].includes(direction))
      throw new Error("Invalid direction.");

    if (this.direction === UP && direction === DOWN) return;
    if (this.direction === DOWN && direction === UP) return;
    if (this.direction === LEFT && direction === RIGHT) return;
    if (this.direction === RIGHT && direction === LEFT) return;

    this.#direction = direction;
  }

  increaseLength() {
    this.body.push({ x: null, y: null });
  }

  increaseSpeed() {
    if (this.#delayCounter === this.#moveDelayTreshold) {
      // Max speed reached
      return;
    }

    this.#moveDelay -= 1;
  }

  move(unit) {
    if (this.#delayCounter !== this.#moveDelay) {
      this.#delayCounter += 1;
      return;
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    switch (this.direction) {
      case UP:
        this.head.y -= unit;
        break;
      case DOWN:
        this.head.y += unit;
        break;
      case LEFT:
        this.head.x -= unit;
        break;
      case RIGHT:
        this.head.x += unit;
        break;
    }

    this.#delayCounter = 0;
    this.detectSelfCollision();
  }

  detectSelfCollision() {
    if (this.length === 1) return;

    const collision = this.body.some((part, i) => {
      let hasCollided = false;

      for (let j = i + 1; j < this.body.length; j++) {
        const otherPart = this.body[j];

        hasCollided = part.x === otherPart.x && part.y === otherPart.y;
      }
      return hasCollided;
    });

    if (collision) {
      this.onCollision();
    }
  }

  reset() {
    this.length = 1;
    this.direction = UP;
    this.#delayCounter = 0;
    this.#moveDelay = 20;
  }
}
