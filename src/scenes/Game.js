import { Scene } from "phaser";
import Unicorn from "../class/Unicorn";
import Player from "../class/Player";
import Confetti from "../class/Confetti";
import Ahriman from "../class/Ahriman";
import { Projectile } from "../class/Projectile";
import Star from "../class/Star";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.initializeGroups();
    this.createPlayer();
    this.createInputHandlers();
    this.createTextDisplays();

    this.cursors = this.input.keyboard.createCursorKeys();

    // Apparition des ennemis
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

    // Apparition des ennemis
    this.time.addEvent({
      delay: 3000, // 5 secondes
      callback: this.spawnAhriman,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });

    // Gérer les collisions entre le joueur et les projectiles
    this.physics.add.collider(
      this.player,
      this.projectiles,
      this.handlePlayerProjectileCollision,
      null,
      this
    );

    // Apparition des étoiles
    this.time.addEvent({
      delay: 12000, // 1 secondes
      callback: this.spawnStar,
      callbackScope: this,
      loop: true, // Répéter l'événement
    });

    // Gérer les collisions entre les balles et les ennemis
    this.physics.add.collider(
      this.bullets,
      this.enemyGroup,
      this.handleEnemyhit,
      null,
      this
    );
    // Gérer les collisions entre le joueur et les ennemis
    this.physics.add.collider(
      this.player,
      this.enemyGroup,
      this.handlePlayerEnemyCollision,
      null,
      this
    );

    // Gérer les collisions entre le joueur et les étoiles
    this.physics.add.collider(
      this.player,
      this.star,
      this.handlePlayerStarCollision,
      null,
      this
    );
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
      createCallback: (projectile) => {
        projectile.setTexture("bullet");
      },
    });
    this.enemyGroup = this.physics.add.group();
    this.chasingEnemyGroup = this.physics.add.group();
    this.star = this.physics.add.group({
      classType: Star,
      runChildUpdate: true,
    });
    this.ahriman = this.physics.add.group({
      classType: Ahriman,
      runChildUpdate: true,
    });
  }

  createPlayer() {
    this.player = new Player(this, 300, 300, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createInputHandlers() {
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      this.player.play("walk");
    });
  }

  createTextDisplays() {
    // vies
    this.lives = 5;
    this.livesText = this.add.text(16, 64, "Lives: 5", {
      fontSize: "48px",
      fill: "#ffffff",
    });
    // score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "48px",
      fill: "#ffffff",
    });
  }

  spawnEnemies() {
    const { width, height } = this.scale;

    // Position aléatoire pour l'ennemi
    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);

    const unicorn = new Unicorn(this, randomX, randomY, "enemyA");
    this.enemyGroup.add(unicorn);

    // Tirer en direction du joueur
    unicorn.shootEvent = this.time.addEvent({
      delay: 2000, // Vitesse
      callback: () => {
        this.shootProjectileToPlayer(unicorn);
      },
      callbackScope: this,
      loop: true, // Répéter l'événement
    });
  }

  spawnChasingEnemy() {
    const { width, height } = this.scale;

    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const chasingEnemy = this.enemyGroup.create(randomX, randomY, "enemyB");

    this.physics.moveToObject(chasingEnemy, this.player, 50);
  }

  spawnAhriman() {
    const { width, height } = this.scale;

    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const ahriman = new Ahriman(this, randomX, randomY, "ahriman");
    this.enemyGroup.add(ahriman);
    ahriman.play("fly");

    this.physics.moveToObject(ahriman, this.player, 80);
  }

  shootProjectileToPlayer(enemy) {
    const projectile = this.projectiles.get();
    if (projectile) {
      projectile.setTexture("enemyC");
      projectile.setFrame(24);
      projectile.setPosition(enemy.x, enemy.y);
      this.physics.moveToObject(projectile, this.player, 100);
    }
  }

  spawnStar() {
    const { width, height } = this.scale;

    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);

    const star = new Star(this, randomX, randomY, "star");
    this.star.add(star);
    this.time.delayedCall(
      5000,
      () => {
        if (star && star.active) {
          // Vérifie si l'étoile existe toujours
          star.destroy();
        }
      },
      [],
      this
    );
  }

  update(time) {
    this.player.update(this.cursors, time);

    this.enemyGroup.getChildren().forEach((unicorn) => {
      unicorn.update();
    });

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

    this.enemyGroup.children.iterate((chasingEnemy) => {
      this.physics.moveToObject(chasingEnemy, this.player, 50);
      // Vitesse de l'ennemi qui va vers le joueur
    });
  }

  handleEnemyhit(bullet, enemy) {
    bullet.destroy();

    if (this.enemyGroup.contains(enemy)) {
      if (enemy.shootEvent) {
        enemy.shootEvent.remove();
      }
    }

    enemy.destroy();
    this.increaseScore();
  }

  increaseScore(points) {
    this.score += 10;
    this.scoreText.setText("Score : " + this.score);
  }

  handlePlayerEnemyCollision(player, enemy) {
    // Réduire la vie du joueur
    this.lives--;
    this.livesText.setText("Lives: " + this.lives);

    // Vérifie si le joueur a encore des vies
    if (this.lives <= 0) {
      this.scene.start("GameOver", { score: this.score });
    }

    if (this.enemyGroup.contains(enemy)) {
      if (enemy.shootEvent) {
        enemy.shootEvent.remove();
      }
      enemy.destroy();
    }
  }

  handlePlayerProjectileCollision(player, projectile) {
    // Réduire la vie du joueur
    this.lives--;
    this.livesText.setText("Lives: " + this.lives);

    // Vérifier si le joueur a encore des vies
    if (this.lives <= 0) {
      this.scene.start("GameOver");
    }

    // Détruire le projectile après la collision
    projectile.destroy();
  }

  handlePlayerStarCollision(player, star) {
    console.info("étoile");
    this.score += 10;
    this.scoreText.setText("Score : " + this.score);
    star.destroy();
  }
}
