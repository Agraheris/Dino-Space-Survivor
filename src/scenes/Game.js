import { Scene } from "phaser";
import { Projectile } from "../class/Projectile";
import Player from "../player";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x00ff00);
    this.add.image(512, 384, "background").setAlpha(0.5);

    // Gérer plusieurs projectiles
    this.projectiles = this.physics.add.group({
      classType: Projectile,
      runChildUpdate: true, // Met à jour les projectiles avec Update
    });

    this.enemies = [
      {
        enemy: this.physics.add.sprite(300, 300, "enemy"),
        directions: [
          [-1, 0], // Tire à gauche
          [0, 1], // Tire vers le bas
          [-1, -1], // Tire en diagonale haut-gauche
        ],
      },
      {
        enemy: this.physics.add.sprite(700, 300, "enemy"),
        directions: [
          [1, 0], // Tire à droite
          [0, -1], // Tire vers le haut
          [1, 1], // Tire en diagonale bas-droite
        ],
      },
    ];

    // Tir automatique des ennemis
    this.enemies.forEach(({ enemy, directions }) => {
      directions.forEach((direction) => {
        this.time.addEvent({
          delay: 2000, // Tir toutes les 2 secondes
          callback: () =>
            this.shootProjectileFromEnemy(enemy, direction[0], direction[1]),
          callbackScope: this,
          loop: true, // Répéter l'événement
        });
      });
    });

    // Initialiser le joueur
    this.player = new Player(this, 400, 300, "player");
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      this.player.play("walk");
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
