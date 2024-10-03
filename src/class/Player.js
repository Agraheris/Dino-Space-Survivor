import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(4);

    this.speed = 100;

    this.fireRate = 500;
    this.lastFired = 0;

    // this.direction = "right";
    this.init();
  }

  init() {
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }

  update(cursors, time) {
    this.setVelocity(0);
    if (cursors.left.isDown && cursors.up.isDown) {
      this.setVelocityX(-this.speed);
      this.setVelocityY(-this.speed);
      this.direction = "up-left";
    } else if (cursors.left.isDown && cursors.down.isDown) {
      this.setVelocityX(-this.speed);
      this.setVelocityY(this.speed);
      this.direction = "down-left";
    } else if (cursors.right.isDown && cursors.up.isDown) {
      this.setVelocityX(this.speed);
      this.setVelocityY(-this.speed);
      this.direction = "up-right";
    } else if (cursors.right.isDown && cursors.down.isDown) {
      this.setVelocityX(this.speed);
      this.setVelocityY(this.speed);
      this.direction = "down-right";
    } else if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.direction = "left";
      this.setFlipX(true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.direction = "right";
      this.setFlipX(false);
    } else if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);
      this.direction = "up";
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
      this.direction = "down";
    }
    if (time > this.lastFired) {
      this.shootConfetti();
      this.lastFired = time + this.fireRate;
    }
  }
  shootConfetti() {
    const bullet = this.scene.bullets.get(this.x, this.y);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setDirection(this.direction);

      switch (this.direction) {
        case "left":
          bullet.setVelocityX(-300);
          bullet.setVelocityY(0);
          break;
        case "right":
          bullet.setVelocityX(300);
          bullet.setVelocityY(0);
          break;
        case "up":
          bullet.setVelocityX(0);
          bullet.setVelocityY(-300);
          break;
        case "down":
          bullet.setVelocityX(0);
          bullet.setVelocityY(300);
          break;
        case "up-right":
          bullet.setVelocityX(212.13);
          bullet.setVelocityY(-212.13);
          break;
        case "up-left":
          bullet.setVelocityX(-212.13);
          bullet.setVelocityY(-212.13);
          break;
        case "down-right":
          bullet.setVelocityX(212.13);
          bullet.setVelocityY(212.13);
          break;
        case "down-left":
          bullet.setVelocityX(-212.13);
          bullet.setVelocityY(212.13);
          break;
        default:
          bullet.setVelocityX(300);
          bullet.setVelocityY(0);
          break;
      }
    }
  }
}

export default Player;
