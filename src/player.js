// import {config, Scene1} from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(4); // GROSSIR x4
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.speed = 100;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }
  }
}
