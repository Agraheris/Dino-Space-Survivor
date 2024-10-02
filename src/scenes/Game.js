import { Scene } from "phaser";
import Player from "../class/Player";
import Confetti from "../class/Confetti";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.player = new Player(this, 300, 300, "player");
    this.player.setVelocityX(this.player.speed);
    this.bullets = this.physics.add.group({
      classType: Confetti,
      runChildUpdate: true,
      maxSize: 10,
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }
  update(time) {
    this.player.update(this.cursors, time);
  }
}
