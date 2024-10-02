import Phaser from "phaser";

class Confetti extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    if (this.y < 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export default Confetti;
