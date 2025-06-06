# 🦖 Dino Space Survivor

![Phaser](https://img.shields.io/badge/Phaser-3.80.1-purple?style=for-the-badge&logo=javascript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Game Development](https://img.shields.io/badge/Game_Dev-🎮-brightgreen?style=for-the-badge)

> **Hackathon 2 "Le Retour" - Wild Code School | Jeu 2D en JavaScript**

Jeu de survie spatial développé en 72h lors du deuxième hackathon de la Wild Code School. Un dinosaure doit survivre dans l'espace en évitant les projectiles dans un gameplay simple mais addictif inspiré des grands classiques de l'arcade.

🎮 **[Jouer maintenant](dinospacesurvivor.netlify.app)**

## 🎯 Concept du Jeu

### 🦕 Gameplay Principal
- **Personnage :** Un dinosaure courageux projeté dans l'espace
- **Objectif :** Survivre le plus longtemps possible en évitant les dangers
- **Mécaniques :** Déplacement fluide, esquive de projectiles
- **Progression :** Système de score avec difficulté croissante

### ⚡ Fonctionnalités de Jeu
- **Déplacement fluide** avec physique réaliste
- **Système de collision** précis et responsive
- **Génération procédurale** d'obstacles projectiles
- **Effets visuels** et animations fluides

## 🚀 Défis du Hackathon

### ⏰ Contrainte Temporelle
**Durée :** 72 heures chrono  
**Équipe :** Développement collaboratif  
**Pression :** Livrer un jeu fonctionnel et amusant

### 🎯 Objectifs Techniques
- **Créer un jeu from scratch** avec Phaser 3
- **Implémenter des mécaniques** de gameplay solides
- **Optimiser les performances** pour une expérience fluide
- **Design d'expérience** utilisateur engageante

## 🛠️ Stack Technique

**Game Engine :**
- **Phaser 3.80** - Framework de jeu HTML5 avancé
- **JavaScript ES6+** avec syntaxe moderne
- **Canvas API** pour le rendu 2D performant

**Build & Development :**
- **Vite** pour un développement rapide et HMR
- **Asset Pipeline** optimisé pour les ressources de jeu
- **Hot Reload** pour itération rapide pendant le hackathon

**Physique & Animation :**
- **Arcade Physics** de Phaser pour collisions réalistes
- **Sprite Animations** fluides et optimisées
- **Particle Systems** pour effets visuels

## 🎮 Architecture du Jeu

### 📁 Structure Modulaire Avancée

```
dino-space-survivor/
├── public/                    # Assets statiques optimisés
│   ├── assets/               # Ressources graphiques et audio
│   │   ├── DinoSprites-red.png    # Sprites animés du personnage
│   │   ├── DinoSprites.png        # Variantes de sprites
│   │   ├── ahriman-flight.png     # Boss volant
│   │   ├── background_stars.webp  # Arrière-plan spatial
│   │   ├── bullet-red.png         # Projectiles ennemis
│   │   ├── bullets.png            # Projectiles joueur
│   │   ├── china.png              # Power-ups
│   │   ├── coup_de_feu.png        # Effets visuels
│   │   ├── enemy.png              # Sprites ennemis
│   │   ├── galaxy.webm            # Vidéo d'arrière-plan
│   │   ├── shroom.png             # Champignons bonus
│   │   ├── skull.svg              # Icônes de game over
│   │   ├── snowman.png            # Boss final Snowman
│   │   ├── star.png               # Collectibles
│   │   └── unicorn.png            # Boss intermédiaire
│   ├── Audio/               # Bande sonore immersive
│   │   ├── Bim_erreur.wav        # SFX erreur
│   │   ├── Cest_parti.wav        # SFX début partie
│   │   └── startKahoot.wav       # Musique de lancement
│   ├── favicon.png          # Icône de l'application
│   └── style.css           # Styles CSS globaux
│
├── src/                     # Code source organisé en MVC
│   ├── class/              # Classes métier Phaser
│   │   ├── Ahriman.js          # Boss aérien avec IA complexe
│   │   ├── Boss.js             # Classe parent des boss
│   │   ├── Confetti.js         # Effets de particules victoire
│   │   ├── Player.js           # Logique joueur et contrôles
│   │   ├── Projectile.js       # Gestion des projectiles
│   │   ├── Shroom.js           # Ennemis mushroom
│   │   ├── Star.js             # Collectibles étoiles
│   │   └── Unicorn.js          # Boss final licorne
│   ├── scenes/             # Scènes de jeu modulaires
│   │   ├── Boot.js             # Chargement initial
│   │   ├── Game.js             # Scène principale de jeu
│   │   ├── GameOver.js         # Écran de fin
│   │   ├── MainMenu.js         # Menu principal
│   │   └── Preloader.js        # Preloading des assets
│   └── main.js             # Point d'entrée et configuration
│
├── vite/                   # Configuration Vite.js
│   ├── config.dev.mjs          # Config développement
│   └── config.prod.mjs         # Config production optimisée
│
└── Configuration files
    ├── package.json            # Dépendances et scripts
    ├── package-lock.json       # Lock des versions
    └── index.html             # Point d'entrée HTML
```

### 🎮 Classes de Jeu Sophistiquées

**Ennemis & Boss :**
- **Ahriman.js** - Boss volant avec patterns d'attaque complexes
- **Boss.js** - Classe parent avec comportements communs
- **Shroom.js** - Ennemis terrestres avec IA de poursuite  
- **Unicorn.js** - Boss intermédiaire avec mécaniques spéciales

**Gameplay Systems :**
- **Player.js** - Contrôles, animations, collisions avancées
- **Projectile.js** - Système de tir multi-directionnel
- **Star.js** - Collectibles avec effets visuels
- **Confetti.js** - Système de particules pour feedback
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+
- npm ou yarn

### Lancement Rapide

```bash
# Cloner le repository
git clone https://github.com/Agraheris/Dino-Space-Survivor.git
cd Dino-Space-Survivor

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Le jeu sera accessible sur [http://localhost:8080](http://localhost:8080)

### Build de Production

```bash
# Créer le build optimisé
npm run build

# Les fichiers de production seront dans le dossier dist/
```

## 🎯 Mécaniques de Jeu Implémentées

### 🕹️ Contrôles
- **Déplacement :** Flèches directionnelles ou WASD
- **Action :** Barre d'espace pour actions spéciales
- **Pause :** Échap pour mettre en pause

### 💎 Système de Score
- **Points de survie :** Temps passé sans collision avec les astéroïdes
- **Système simple** mais efficace et addictif
- **Difficulté progressive :** Vitesse et densité d'astéroïdes croissantes

### 🌟 Mécaniques Principales
- **Mouvement fluide** du dinosaure dans l'espace
- **Collision detection** précise avec les astéroïdes
- **Spawn d'obstacles** aléatoire et progressif
- **Game over** et système de restart

## 🏆 Résultats du Hackathon

**Achievement débloqués :**
- ✅ **Jeu fonctionnel** livré dans les temps
- ✅ **Gameplay addictif** et rejouabilité
- ✅ **Collaboration efficace** en équipe
- ✅ **Code propre** malgré la contrainte de temps
- ✅ **Présentation réussie** devant jury/peers

## 💡 Compétences Développées

### 🎮 Game Development
- **Phaser 3 mastery** - Moteur de jeu professionnel
- **Game Design patterns** - Architecture de jeu scalable
- **Physics & Collisions** - Gestion précise des interactions
- **Performance optimization** - 60 FPS constant

### 🚀 Développement Agile
- **Rapid prototyping** sous contrainte temporelle
- **Feature prioritization** - MVP puis améliorations
- **Team collaboration** efficace sous pression
- **Problem solving** créatif et rapide

### 🎨 Expérience Utilisateur
- **Game Feel** - Sensation de jeu satisfaisante
- **Feedback loops** - Réactions immédiates du jeu
- **Progressive difficulty** - Courbe d'apprentissage équilibrée
- **Visual polish** - Finition soignée malgré le temps limité

## 🎨 Aperçu Visuel

*[Captures d'écran à ajouter]*
- Écran de menu principal
- Gameplay en action avec dinosaure et astéroïdes
- Interface de score et power-ups
- Écran de game over avec high score

## 🔄 Améliorations Possibles

**Fonctionnalités futures :**
- Multijoueur local en écran partagé
- Système de niveaux et boss fights
- Customisation du dinosaure
- Leaderboard en ligne
- Mobile responsiveness

## 🌟 Points Forts du Projet

### 🎯 **Différenciation Technique**
Ce projet démontre ma **polyvalence** au-delà du développement web classique :
- **Game development** avec Phaser 3
- **Logique de jeu** complexe et états multiples
- **Optimisation performance** pour animations fluides
- **Gestion d'événements** temps réel

### 🚀 **Soft Skills Démontrées**
- **Créativité** sous contrainte de temps
- **Adaptabilité** face aux défis techniques
- **Esprit d'équipe** en situation de stress
- **Gestion de projet** avec deadline fixe

## 👨‍💻 Équipe de Développement

**Hackathon Wild Code School** - Équipe collaborative  
**Développeur :** Clément Vigouroux  
**Durée :** 72h de développement intensif  
**Technologies :** Phaser 3, JavaScript, Vite

---

*🎮 Développé avec passion lors du Hackathon "Le Retour" - Démonstration de créativité et polyvalence technique*
