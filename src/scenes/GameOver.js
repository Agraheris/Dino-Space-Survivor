import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.score = data.score;
  }

  // Background
  createBackground() {
    const background = this.add.image(0, 0, "skull").setOrigin(0.5);
    const scaleX = this.scale.width / background.width;
    const scaleY = 0.6 * (this.scale.height / background.height);
    background.setScale(scaleX, scaleY);
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    background.setPosition(centerX, centerY);
  }

  // ajout d'un commentaire à effacer.

  create() {
    this.cameras.main.setBackgroundColor(0x1d061f);
    this.createBackground();

    this.add
      .text(512, 384, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);
    this.add
      .text(512, 484, `Score : ${this.score}`, {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);
    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
