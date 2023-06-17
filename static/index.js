import { game } from "modules/game";
import { controller } from "modules/controls";
import { BOARD_WIDTH, BOARD_HEIGHT } from "const";
import { Drawer } from "modules/drawer";
import { $ } from "utils";

/**
@type HTMLCanvasElement
*/
const canvas = $("#game");

canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const drawer = new Drawer(canvas);

function loop() {
  drawer.clear();
  drawer.drawBounds();
  drawer.drawSnake();

  if (game.started) {
    drawer.drawApple();
    game.snake.move(game.snake.size);

    game.detectOutOfBounds();
    game.detectAppleEaten();
  }

  requestAnimationFrame(loop);
}

(function main() {
  controller.setControls();

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
