import Phaser from "phaser";

class Shroom extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1.5);
    this.speed = 100;

    this.body.setSize(25, 36); // Remplace la largeur et la hauteur
    this.body.setOffset(62, 64); // Ajuste ces valeurs pour centrer la hitbox si nécessaire

    this.init();
  }

  init() {
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }

  update() {
    if (this.body.velocity.x < 0) {
      this.setFlipX(true);
    } else if (this.body.velocity.x > 0) {
      this.setFlipX(false);
    }
  }
}

export default Shroom;
