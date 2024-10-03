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

    // Initialiser le joueur
    this.player = new Player(this, 400, 300, "player");
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      this.player.play("walk");
    });

    // Apparition des ennemis à projectiles
    this.time.addEvent({
      delay: 5000, // 5 secondes
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });

    // Apparition des ennemis qui vont vers le joueur
    this.time.addEvent({
      delay: 7000, // 7 secondes
      callback: this.spawnChasingEnemy,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });

    this.enemyGroup = this.physics.add.group();
    this.chasingEnemyGroup = this.physics.add.group();
  }

  // Créer des ennemis à projectiles
  spawnEnemies() {
    const { width, height } = this.scale;

    // Position aléatoire pour l'ennemi
    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const enemy = this.enemyGroup.create(randomX, randomY, "enemy");

    // Tirer en direction du joueur
    this.time.addEvent({
      delay: 10000, // Tir toutes les 10 secondes
      callback: () => {
        this.shootProjectileToPlayer(enemy);
      },
      callbackScope: this,
      loop: true, // Répéter l'événement
    });
  }

  //  Créer des ennemis qui poursuit le joueur
  spawnChasingEnemy() {
    const { width, height } = this.scale;

    // Position aléatoire pour l'ennemi
    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const chasingEnemy = this.chasingEnemyGroup.create(
      randomX,
      randomY,
      "chasing-enemy"
    );

    this.physics.moveToObject(chasingEnemy, this.player, 50);
    // Vitesse de l'ennemi qui poursuit le joueur
  }

  // Tirer un projectile attiré vers le joueur
  shootProjectileToPlayer(enemy) {
    const projectile = this.projectiles.get();
    if (projectile) {
      projectile.setPosition(enemy.x, enemy.y);
      this.physics.moveToObject(projectile, this.player, 100);
      // Vitesse du projectile
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

    this.chasingEnemyGroup.children.iterate((chasingEnemy) => {
      this.physics.moveToObject(chasingEnemy, this.player, 50);
      // Vitesse de l'ennemi qui va vers le joueur
    });
  }
}
