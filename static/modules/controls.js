import {
  DOWN,
  LEFT,
  RIGHT,
  UP,
  KEY_W,
  KEY_S,
  KEY_A,
  KEY_D,
  KEY_ENTER,
} from "const";
import { game } from "modules/game";

class Controller {
  setControls() {
    document.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case KEY_ENTER:
          game.start();
          break;
        case KEY_W:
          game.snake.setDirection(UP);
          break;
        case KEY_S:
          game.snake.setDirection(DOWN);
          break;
        case KEY_A:
          game.snake.setDirection(LEFT);
          break;
        case KEY_D:
          game.snake.setDirection(RIGHT);
          break;
      }
    });
  }
}

export const controller = new Controller();
