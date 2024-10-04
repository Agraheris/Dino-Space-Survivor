import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");
    this.load.image("logo", "logo.png");
    this.load.image("enemyA", "enemy.png");
    this.load.image("enemyB", "crown.png");
    this.load.image("enemyC", "china.png");

    this.load.spritesheet("player", "DinoSprites-red.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

    this.load.image("background-stars", "background_stars.webp");
    this.load.audio("gameOverMusic", "Bim_erreur.wav");
    this.load.audio("menuStarMusic", "Cest_parti.wav");

    this.load.image("bullet", "bullet-red.png");

    this.load.image("star", "star.png");

    this.load.image("skull", "skull.svg");

    this.load.spritesheet("bullets", "bullets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 13 }),
      frameRate: 16,
      repeat: -1,
    });

    this.scene.start("MainMenu");
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.load.spritesheet("player", "DinoSprites.png", {
      frameHeight: 24,
      frameWidth: 24,
    });
  }
}
