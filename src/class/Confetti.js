import Phaser from "phaser";

class Confetti extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    if (
      this.y < 0 ||
      this.y > this.scene.scale.height ||
      this.x < 0 ||
      this.x > this.scene.scale.width
    ) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  setDirection(direction) {
    switch (direction) {
      case "left":
        this.rotation = Phaser.Math.DegToRad(180);
        break;
      case "right":
        this.rotation = Phaser.Math.DegToRad(0);
        break;
      case "up":
        this.rotation = Phaser.Math.DegToRad(-90);
        break;
      case "down":
        this.rotation = Phaser.Math.DegToRad(90);
        break;
      // case "up-right":
      //   this.rotation = Phaser.Math.DegToRad(-212.13);
      //   break;
      // case "up-left":
      //   this.rotation = Phaser.Math.DegToRad(-212.13);
      //   break;
      // case "down-right":
      //   this.rotation = Phaser.Math.DegToRad(212.13);
      //   break;
      // case "down-left":
      //   this.rotation = Phaser.Math.DegToRad(212.13);
      //   break;
      case "up-right":
        this.rotation = Phaser.Math.DegToRad(-45);
        break;
      case "up-left":
        this.rotation = Phaser.Math.DegToRad(-135);
        break;
      case "down-right":
        this.rotation = Phaser.Math.DegToRad(45);
        break;
      case "down-left":
        this.rotation = Phaser.Math.DegToRad(135);
        break;
    }
  }
}

export default Confetti;
