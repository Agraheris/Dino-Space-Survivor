import Phaser from "phaser";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startX, startY, projectileImage) {
    super(scene, startX, startY, projectileImage);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.speed = 100; // Vitesse du projectile
  }

  // Positionnement et direction du projectile
  shoot(startX, startY, directionX, directionY) {
    this.setPosition(startX, startY);
    this.setActive(true);
    this.setVisible(true);

    this.setVelocity(directionX * this.speed, directionY * this.speed);
  }

  update() {
    // Détruire le projectile si il sort de l'écran
    if (
      this.x < 0 || // Trop à gauche
      this.x > this.scale.width || // Trop à droite
      this.y < 0 || // Trop en haut
      this.y > this.scale.height // Trop en bas
    ) {
      this.destroy();
    }
  }
}
