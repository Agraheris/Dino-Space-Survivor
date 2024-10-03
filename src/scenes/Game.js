import { Scene } from "phaser";
import { Projectile } from "../class/Projectile";
import Player from "../player";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("background-stars", "assets/background_stars.webp");
  }

  create() {
    // Pour que l'image prenne toute l'écran
    const { width, height } = this.scale;
    const background = this.add.image(0, 0, "background-stars").setOrigin(0, 0);
    background.setDisplaySize(width, height);

    // Gérer plusieurs projectiles
    this.projectiles = this.physics.add.group({
      classType: Projectile,
      runChildUpdate: true, // Met à jour les projectiles avec Update
    });

    this.enemyGroup = this.physics.add.group();

    // Initialiser le joueur
    this.player = new Player(this, 400, 300, "player");
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      this.player.play("walk");
    });

    // Réapparition des ennemis
    this.time.addEvent({
      delay: 5000, // 5 secondes
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });
  }

  // Créer de nouveaux ennemis
  spawnEnemies() {
    const { width, height } = this.scale;

    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);

    const directions = [
      [-1, 0], // Tire à gauche
      [1, 0], // Tire à droite
      [0, -1], // Tire vers le haut
      [0, 1], // Tire vers le bas
      [-1, -1], // Diagonale haut-gauche
      [1, 1], // Diagonale bas-droite
    ];

    const enemy = this.enemyGroup.create(randomX, randomY, "enemy");

    // Tirer dans la direction aléatoire
    const randomIndex = Phaser.Math.Between(0, directions.length - 1);
    const randomDirection = directions[randomIndex];

    // Configuration Ennemis
    this.time.addEvent({
      delay: 2000, // Tir toutes les 2 secondes
      callback: () => {
        this.shootProjectileFromEnemy(
          enemy,
          randomDirection[0],
          randomDirection[1]
        );
      },
      callbackScope: this,
      loop: true, // Répéter l'événement
    });
  }

  // Direction du tir
  shootProjectileFromEnemy(enemy, directionX, directionY) {
    const projectile = this.projectiles.get();
    if (projectile) {
      projectile.shoot(enemy.x, enemy.y, directionX, directionY); // Lance le projectile
    }
  }

  update() {
    // Mettre à jour le joueur
    this.player.update();

    if (
      this.player.body.velocity.x !== 0 ||
      this.player.body.velocity.y !== 0
    ) {
      if (!this.player.anims.isPlaying) {
        this.player.play("walk", true);
      }
    } else {
      this.player.stop();
    }
  }
}
