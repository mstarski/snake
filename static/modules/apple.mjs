export class Apple {
  #spriteUrl = "../gfx/apple.png";

  x;
  y;
  size = 20;
  sprite;

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = this.#spriteUrl;
  }
}
