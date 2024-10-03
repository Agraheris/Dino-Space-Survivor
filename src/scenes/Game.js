import { Scene } from "phaser";
import Player from "../class/Player";
import Confetti from "../class/Confetti";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.player = new Player(this, 300, 300, "player");

    this.bullets = this.physics.add.group({
      classType: Confetti,
      runChildUpdate: true,
      maxSize: -1,
    });

    this.player.bullets = this.bullets;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      // this.scene.start("bullet");
    });
  }
  update(time) {
    this.player.update(this.cursors, time);
  }
}
