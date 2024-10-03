import { Scene } from "phaser";
import Player from "../class/Player";
import Confetti from "../class/Confetti";
import { Projectile } from "../class/Projectile";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  create() {
    this.createBackground();
    this.initializeGroups();
    this.createPlayer();
    this.createEnemies();
    this.createInputHandlers();

    // Réapparition des ennemis à intervalles réguliers
    this.time.addEvent({
      delay: 5000, // 5 secondes
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });

    // score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "48px",
      fill: "#ffffff",
    });
  }

  // Background
  createBackground() {
    const { width, height } = this.scale;
    const background = this.add.image(0, 0, "background-stars").setOrigin(0, 0);
    background.setDisplaySize(width, height);
  }

  initializeGroups() {
    this.bullets = this.physics.add.group({
      classType: Confetti,
      runChildUpdate: true,
      maxSize: -1,
    });
    this.projectiles = this.physics.add.group({
      classType: Projectile,
      runChildUpdate: true,
    });
    this.enemyGroup = this.physics.add.group();
  }

  // Joueur
  createPlayer() {
    this.player = new Player(this, 300, 300, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createEnemies() {
    this.unicorn = new Unicorn(this, 512, 384, "enemyA");
  }

  createInputHandlers() {
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      this.player.play("walk");
    });
  }

  spawnEnemies() {
    const { width, height } = this.scale;

    // Position aléatoire pour l'ennemi
    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const enemy = this.enemyGroup.create(randomX, randomY, "enemy");

    // Tirer en direction du joueur toutes les 2 secondes
    this.time.addEvent({
      delay: 2000, // Tir toutes les 2 secondes
      callback: () => {
        this.shootProjectileToPlayer(enemy);
      },
      callbackScope: this,
      loop: true, // Répéter l'événement
    });
  }

  shootProjectileToPlayer(enemy) {
    const projectile = this.projectiles.get();
    if (projectile) {
      projectile.setPosition(enemy.x, enemy.y);
      this.physics.moveToObject(projectile, this.player, 300);
      // 300 est la vitesse du projectile
    }
  }

  update(time) {
    this.player.update(this.cursors, time);
    this.unicorn.update();

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

  increaseScore(points) {
    this.score += points;
    this.scoreText.setText("Score : " + this.score);
  }
  /* 
  shootSent(player) {


    score += 10;
    scoreText.setText("Score: " + score);
  } */
}
