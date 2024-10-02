import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 200;

    this.fireRate = 300;
    this.lastFired = 0;

    this.init();
  }

  init() {
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }

  update(cursors, time) {
    this.setVelocity(0);

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
    }
    if (cursors.up.isDown) {
      this.setVelocity(-this.speed);
    } else if (cursors.down.isDown) {
      this.setVelocity(this.speed);
    }
    if (cursors.space.isDown && time > this.lastFired) {
      this.shootConfetti();
      this.lastFired = time + this.fireRate;
    }
  }
  shootConfetti() {
    const bullet = this.scene.bullets.get(this.x, this.y);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setVelocityY(-300);
    }
  }
}

export default Player;
