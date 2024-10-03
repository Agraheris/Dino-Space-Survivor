import Phaser from "phaser";

class Unicorn extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1.5);
    this.speed = 100;

    this.init();
  }

  init() {
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }

  update() {
    if (this.body.blocked.left) {
      this.setVelocityX(this.speed);
    } else if (this.body.blocked.right) {
      this.setVelocityX(-this.speed);
    }
  }
}

export default Unicorn;
