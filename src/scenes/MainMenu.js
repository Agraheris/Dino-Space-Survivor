import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  // Background
  createBackground() {
    const background = this.add.image(0, 0, "logo").setOrigin(0.5);
    const scaleX = 0.5 * (this.scale.width / background.width);
    const scaleY = 0.6 * (this.scale.height / background.height);
    background.setScale(scaleX, scaleY);

    const centerX = this.scale.width / 2;
    const topY = 250;

    background.setPosition(centerX, topY);
  }

  create() {
    this.cameras.main.setBackgroundColor(0x181a27);
    this.createBackground();
    const menuStartMusic = this.sound.add("menuStartMusic", { loop: false });
    if (menuStartMusic) {
      menuStartMusic.play();
    } 
    this.add
      .text(530, 590, "*** Click and START ***", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
      this.menuStartMusic.play();
    });
  }
}
