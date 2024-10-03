import { Scene } from "phaser";
import Unicorn from "../class/Unicorn";
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

    // this.lives = 5;
    // this.livesText = this.add.text(16, 64, "Lives: 5", {
    //   fontSize: "48px",
    //   fill: "#ffffff",
    // });

    this.player.bullets = this.bullets;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
      // this.scene.start("bullet");
    });
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

    // Gére les collisions entre les balles et les ennemis
    this.physics.add.collider(
      this.bullets,
      this.enemyGroup,
      this.handleEnemyhit,
      null,
      this
    );
    // Gére les collisions entre le joueur et les ennemis
    // this.physics.add.collider(
    //   this.player,
    //   this.enemyGroup,
    //   this.handlePlayerEnemyCollision,
    //   null,
    //   this
    // );

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
      createCallback: (projectile) => {
        projectile.setTexture("bullet");
      },
    });
    this.enemyGroup = this.physics.add.group();
    this.chasingEnemyGroup = this.physics.add.group();
  }

  // Joueur
  createPlayer() {
    this.player = new Player(this, 300, 300, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createEnemies() {
    // this.unicorn = new Unicorn(this, 512, 384, "enemyA");
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

  //  Créer des ennemis qui poursuit le joueur
  spawnChasingEnemy() {
    const { width, height } = this.scale;

    // Position aléatoire pour l'ennemi
    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);
    const chasingEnemy = this.enemyGroup.create(randomX, randomY, "enemyA");

    this.physics.moveToObject(chasingEnemy, this.player, 50);
    // Vitesse de l'ennemi qui poursuit le joueur
  }

  // Tirer un projectile attiré vers le joueur
  shootProjectileToPlayer(enemy) {
    const projectile = this.projectiles.get();
    if (projectile) {
      projectile.setTexture("bullets");
      projectile.setFrame(24);
      projectile.setPosition(enemy.x, enemy.y);
      this.physics.moveToObject(projectile, this.player, 100);
      // Vitesse du projectile
    }
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
}
