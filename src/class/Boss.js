class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true); // Permettre les collisions avec les limites du monde
      this.health = 3;
      this.setScale(2);
    }
  
    takeDamage() {
      this.health--;
      if (this.health <= 0) {
        this.destroy(); // Détruit le boss quand la santé atteint zéro
        return true;
      }
      return false;
    }
  }

  export default Boss