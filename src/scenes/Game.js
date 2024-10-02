import { Scene } from "phaser";
import Unicorn from "../class/Unicorn";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.unicorn = new Unicorn(this, 512, 384, "enemyA");
    this.unicorn.setVelocityX(this.unicorn.speed);

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }

  update() {
    this.unicorn.update();
  }
}
