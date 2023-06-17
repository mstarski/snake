export class Apple {
  #spriteUrl = "../gfx/apple.png";

  x;
  y;
  size = 24;
  sprite;

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = new Image(this.size, this.size);
    this.sprite.src = this.#spriteUrl;
  }
}
