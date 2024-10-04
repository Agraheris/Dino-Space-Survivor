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

  preload() {
    // Charger la vidéo dans le préchargement de la scène
    this.load.video("galaxy", "assets/galaxy.webm", "loadeddata", false, true);
  }

  create() {
    // Ajout de la vidéo en tant que fond d'écran
    this.createBackgroundVideo();

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

    // Apparition des étoiles toutes les 10 secondes (ajuste selon tes besoins)
    this.time.addEvent({
      delay: 10000, // Toutes les 10 secondes
      callback: this.spawnStar,
      callbackScope: this,
      loop: true, // Répéter l'apparition des étoiles
    });

    // Apparition du power-up "coup_de_feu"
    this.time.addEvent({
      delay: 30000, // 30 secondes
      callback: this.spawnPowerUp,
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

    this.physics.add.collider(
      this.player,
      this.projectiles,
      this.handlePlayerProjectileCollision,
      null,
      this
    );

    // Gérer les collisions entre les projectiles du joueur et les ennemis
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

    // Gérer les collisions entre le joueur et les power-ups
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.handlePlayerPowerUpCollision,
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

  // Méthode pour créer et afficher la vidéo en arrière-plan
  createBackgroundVideo() {
    const video = this.add.video(0, 0, "galaxy");
    video.setOrigin(0, 0);
    video.setDisplaySize(this.scale.width, this.scale.height);
    video.setDepth(-1);
    video.play(true);
  }

  initializeGroups() {
    this.bullets = this.physics.add.group({
      classType: Confetti,
      runChildUpdate: true,
      maxSize: -1,
      allowGravity: false,
      collideWorldBounds: false,
    });

    this.projectiles = this.physics.add.group({
      classType: Projectile,
      runChildUpdate: true,
      createCallback: (projectile) => {
        projectile.setTexture("bullet");
        projectile.body.collideWorldBounds = false;
        projectile.body.onWorldBounds = true;
      },
    });

    this.powerUps = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.chasingEnemyGroup = this.physics.add.group();
    this.star = this.physics.add.group({
      classType: Star,
      runChildUpdate: true,
    });

    // Ajout du groupe pour Ahriman
    this.ahriman = this.physics.add.group({
      classType: Ahriman,
      runChildUpdate: true,
    });

    // Gestion de la destruction des projectiles quand ils quittent les limites
    this.physics.world.on("worldbounds", (body) => {
      if (body.gameObject) {
        body.gameObject.destroy();
      }
    });
  }

  createPlayer() {
    this.player = new Player(this, 300, 300, "player");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.body.collideWorldBounds = true;
    // S'assurer que le joueur ne sort pas des limites
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

    const barConfig = {
      width: 200,
      height: 20,
      maxHealth: 5,
      padding: 2,
    };
    this.healthBar = this.add.group();
    for (let i = 0; i < barConfig.maxHealth; i++) {
      const x = i * (barConfig.width / barConfig.maxHealth + barConfig.padding);
      const healthSquare = this.add.rectangle(
        x,
        0,
        barConfig.width / barConfig.maxHealth,
        barConfig.height,
        0x00ff00
      );
      this.healthBar.add(healthSquare);
    }

    this.healthBar.getChildren().forEach((healthSquare, index) => {
      healthSquare.setPosition(
        10 +
          index * (barConfig.width / barConfig.maxHealth + barConfig.padding),
        10
      );
    });
    // score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "48px",
      fill: "#ffffff",
    });
  }

  updateHealthBar() {
    this.healthBar.getChildren().forEach((square, index) => {
      if (index < this.lives) {
        square.fillColor = 0x00ff00; // Vert pour la vie restante
      } else {
        square.fillColor = 0xff0000; // Rouge pour la vie perdue
      }
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

  spawnPowerUp() {
    const { width, height } = this.scale;

    const randomX = Phaser.Math.Between(0, width);
    const randomY = Phaser.Math.Between(0, height);

    const powerUp = this.powerUps.create(randomX, randomY, "coup_de_feu");
    this.time.delayedCall(
      5000,
      () => {
        if (powerUp && powerUp.active) {
          powerUp.destroy();
        }
      },
      [],
      this
    );
  }

  shootInAllDirections() {
    const directions = [
      { x: 1, y: 0 }, // droite
      { x: -1, y: 0 }, // gauche
      { x: 0, y: 1 }, // bas
      { x: 0, y: -1 }, // haut
      { x: 1, y: 1 }, // diagonale bas droite
      { x: -1, y: 1 }, // diagonale bas gauche
      { x: 1, y: -1 }, // diagonale haut droite
      { x: -1, y: -1 }, // diagonale haut gauche
    ];

    directions.forEach((direction) => {
      // Récupérer ou créer un projectile
      const projectile =
        this.bullets.getFirstDead(false) ||
        this.bullets.create(this.player.x, this.player.y, "bullet");

      if (projectile) {
        projectile.setPosition(this.player.x, this.player.y);
        projectile.setActive(true);
        projectile.setVisible(true);

        projectile.body.setVelocity(0, 0);

        // Attribuer la bonne vitesse aux projectiles
        projectile.body.setVelocity(direction.x * 300, direction.y * 300);

        // Désactiver les collisions avec les bords du monde et les détecter pour destruction
        projectile.setCollideWorldBounds(false);
        projectile.body.onWorldBounds = true;

        // Détruire le projectile après qu'il sorte des limites de l'écran
        projectile.body.world.on("worldbounds", () => {
          projectile.destroy();
        });
      }
    });
  }

  handlePlayerPowerUpCollision(player, powerUp) {
    powerUp.destroy();

    // Activer le mode tir rapide pendant 5 secondes
    this.time.addEvent({
      delay: 200, // Intervalle de tir rapide
      callback: this.shootInAllDirections, // Fonction pour tirer dans toutes les directions
      callbackScope: this,
      repeat: 25, // Répéter toutes les 200ms pendant 5 secondes (25 fois)
    });
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
    this.updateHealthBar();

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
    this.updateHealthBar();

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
