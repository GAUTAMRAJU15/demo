import { game, gameOptions } from '../../invader';
import { PLAY_SCENE_KEY } from '../../constants/sceneKeys';
import QuesImg from '../../../assets/images/question.png';
import clockImg from '../../../assets/images/clock.png';
import lifeImg from '../../../assets/images/life1.png';
import coinImg from '../../../assets/images/coin.png';
import skyImg from '../../../assets/images/sky1.png';
import themeSound from '../../../assets/sound/startSound.mp3';
import deathSound from '../../../assets/sound/explode1.mp3';
import coinSound from '../../../assets/sound/p-ping.mp3';
import { gameOver, pushQuestion } from '../../questionModal/data';
import bg01 from '../../../assets/images/bg01.png';
import bg02 from '../../../assets/images/bg02.png';
import bg03 from '../../../assets/images/bg03.jpg';

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    const mod = document.querySelector('.showModal');
    const purchase = document.querySelector('.show-purchase');
    const game = document.querySelector("#game");
    game.style.background = "#fff";
    this.counterSize = false;
    if (mod) {
      mod.style.setProperty('position', 'absolute', 'important');
      mod.style.width = '630px';
      mod.style.height = '350px';
      mod.style.top = '160px';
      mod.style.left = '38%';
      mod.style.marginTop = '40px';
      mod.style.marginLeft = '12%';
    }

    if (purchase) {
      purchase.style.top = '170px';
      purchase.style.left = '38%';
    }
  }
}

export default class PlayGame extends Phaser.Scene {
  // the game scene key is 'PlayGame'
  constructor() {
    super(`${PLAY_SCENE_KEY}`);
  }

  // loads the scene with initial data
  init(data) {
    this.coins = data.data.coins || 0;
    this.currentCoin = data.data.coins || 0;
    this.name = data.data.name;
    this.index = 0;
    this.id = data.data.id;
    this.mode = data.data.mode;
    this.totalSecondsUsed = data.data.totalSecondsUsed;
    this.currentGain = 0;
    this.counter = 0;
    this.resumeQuestion = false;
    this.timeLeft = 3;
    this.timeOver = false;
    this.resumeTimer = null;
    this.askingQuestion = false;
    this.lastChance = false;
    this.modalNotAlive = true;
    this.quesCollison = 0;
    this.unlockHintCounter = 0;
    this.minute = 0;
    this.seconds = 0;
    this.fallOver = false;
    this.dying = false;
    this.fromGameOver = data.data.fromGameOver || 'true';
    this.initialise = data.data.initialise;
    this.counterSize = data.data.counter;
    this.isPurchased = 0;
    this.gain = 0;
  }

  // preloads the content before game assets placement
  preload() {
    this.textures.addBase64('ques', QuesImg);
    this.textures.addBase64('timer', clockImg);
    this.textures.addBase64('life1', lifeImg);
    this.textures.addBase64('star', coinImg);
    this.load.audio('theme', themeSound);
    this.load.audio('death', deathSound);
    this.load.audio('starmusic', coinSound);
    this.textures.addBase64('bg01', bg01);
    this.textures.addBase64('bg02', bg02);
    this.textures.addBase64('bg03', bg03);

    if (this.fromGameOver === 'true') {
      const { width } = this.cameras.main;
      const { height } = this.cameras.main;

      this.load.image('sky', skyImg);
      const image = this.add.image(580, 235, 'sky');
      image.setScale(1).setScrollFactor(0);
      image.setAlpha(0.8);

      const progressBar = this.add.graphics();
      const progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width / 2 - 140, height / 2 - 140, 320, 50);
      progressBox.setDepth(1);

      const loadingText = this.make.text({
        x: width / 2 + 20,
        y: height / 2 - 50,
        text: 'Loading Code Dash...',
        style: {
          fontFamily: 'Montserrat',
          font: '600 25px Montserrat',
          fill: '#ffffff',
        },
      });
      loadingText.setOrigin(0.5, 0.5);
      const percentText = this.make.text({
        x: width / 2 + 30,
        y: height / 2 - 115,
        text: '0%',
        style: {
          font: '20px Montserrat',
          fill: '#ffffff',
        },
      });
      percentText.setOrigin(0.5, 0.5);
      percentText.setDepth(4);
      const assetText = this.make.text({
        x: width / 2 + 10,
        y: height / 2 + 10,
        text: '',
        style: {
          font: '20px Montserrat',
          fill: '#ffffff',
        },
      });
      assetText.setOrigin(0.5, 0.5);
      this.load.on('progress', value => {
        percentText.setText(`${parseInt(value * 100)}%`);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 0.5);
        progressBar.setDepth(2);
        progressBar.fillRect(
          width / 2 - 130,
          height / 2 - 130,
          300 * value,
          30,
        );
      });
      this.load.on('fileprogress', file => {
        assetText.setText(`Loading asset: ${file.key}`);
      });
      this.load.on('complete', () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
      });
    }
  }

  animateText(scoreText) {
    scoreText.visible = true;
    scoreText.x = this.player.x;
    scoreText.y = this.player.y - 50;
    this.tweens.add({
      targets: scoreText,
      y: scoreText.y - 100,
      alpha: 0,
      duration: 3000,
      ease: 'Cubic.easeOut',
      callbackScope: this,
      onComplete() {
        scoreText.x = game.config.width * 0.83;
        scoreText.y = game.config.height * 0.2;
        scoreText.alpha = 1;
        scoreText.visible = false;
      },
    });
  }

  // when player collides with coin object
  async collectStar(player, coin) {
    if (!this.dying) {
      const bonus = 1;
      coin.disableBody(true, true);
      this.coinGroup.killAndHide(coin);
      this.coinGroup.remove(coin);
      this.coins += bonus;
      this.currentGain += bonus;
      this.scoreText.setText(this.coins);
      this.starmusic.play();
      this.gain += bonus;
    }
  }

  // when player collides with question object
  collectQues(player, ques) {
    if (!this.dying && this.modalNotAlive && this.quesCollison === 0) {
      this.quesGroup.killAndHide(ques);
      this.quesGroup.remove(ques);
      this.askingQuestion = true;
      this.mountainsBack.active = false;
      this.mountainsMid.active = false;
      this.mountainsFront.active = false;
      pushQuestion(this.index, game, false); // false represent isNotDead
    }
  }

  // creating sprite group to dynamically allocate sprites
  addSpriteGroup() {
    this.lives = this.add.group({
      key: 'life1',
      repeat: 2,
      setXY: {
        x: game.config.width * 0.86,
        y: game.config.height * 0.1,
        stepX: 40,
        stepY: 0,
      },
    });

    this.lives.children.iterate(life => {
      life.displayWidth = 30 * window.devicePixelRatio;
      life.displayHeight = 30 * window.devicePixelRatio;
    });

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.coinGroup = this.add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.quesGroup = this.add.group({
      removeCallback(ques) {
        ques.scene.quesPool.add(ques);
      },
    });

    this.quesPool = this.add.group({
      removeCallback(ques) {
        ques.scene.quesGroup.add(ques);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });
  }

  create() {
    this.addedPlatforms = 0;
    this.playerJumps = 0;
    this.chances = 3;
    this.deletingLife = false;
    this.questionData = null;
    this.bonus1 = 15;
    this.mod = document.querySelector('.showModal');
    !this.mod
      ? document.querySelector('.modal-dialog').classList.add('showModal')
      : null;

    this.mod1 = document.querySelector('.show-pur.show-purcchase');
    !this.mod1
      ? document.querySelector('.purchase').classList.add('show-purchase')
      : null;

    const { width } = this.cameras.main;
    let fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;
    let fullscreenEnabled =
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled;

    this.input.keyboard.on(
      'keydown_SHIFT',
      function() {
        // Find the right method, call on correct element
        fullscreenElement = null;
        fullscreenEnabled = null;
        function launchIntoFullscreen(element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }

        const mod = document.querySelector('.showModal');
        const purchase = document.querySelector('.show-purchase');
        const game = document.querySelector("#game");


        if (mod) {
          mod.style.setProperty('position', 'fixed', 'important');
          mod.style.width = '810px';
          mod.style.height = '550px';
          mod.style.top = '70%';
          mod.style.left = '50%';
          mod.style.marginTop = '-100px';
          mod.style.marginLeft = '-10px';
          // mod.style.maxHeight = 'none';
        }

        if (purchase) {
          purchase.style.top = '400px';
          purchase.style.left = '44%';
        }

        if (!(fullscreenElement && fullscreenEnabled)) {
          game.style.background = "none";
          launchIntoFullscreen(document.getElementById('game'));
          this.counterSize = true;
        }
      },
      this,
    );

    this.mountainsBack = this.add.tileSprite(
      width * 0.5,
      100,
      game.config.width,
      game.config.height + 350,
      'bg03',
    );
    this.mountainsBack.setScale(1.2).setScrollFactor(0);

    this.mountainsMid = this.add.tileSprite(
      width * 0.5,
      150,
      game.config.width,
      game.config.height + 400,
      'bg02',
    );
    this.mountainsMid.setScale(1.2).setScrollFactor(0);

    this.mountainsFront = this.add.tileSprite(
      width * 0.5,
      280,
      game.config.width,
      game.config.height + 500,
      'bg01',
    );

    this.mountainsFront.setScale(1.2).setScrollFactor(0);

    this.music = this.sound.add('theme');
    this.death = this.sound.add('death');
    this.starmusic = this.sound.add('starmusic');
    this.music.setLoop(true);
    this.music.play();
    this.addSpriteGroup();

    // text for correct
    this.correctText = this.add.text(
      game.config.width * 0.83,
      game.config.height * 0.2,
      `+${this.bonus1}\nCorrect!`,
      {
        fontFamily: 'Montserrat',
        font: 'bold 25px Montserrat',
        fill: '#2ecb71',
      },
    );
    this.correctText.visible = false;

    // text for inncorrect
    this.incorrectText = this.add.text(
      game.config.width * 0.83,
      game.config.height * 0.2,
      '-10\n Incorrect!',
      {
        fontFamily: 'Montserrat',
        font: 'bold 25px Montserrat',
        fill: '#ff6258',
      },
    );
    this.incorrectText.visible = false;

    // adding the resuming tinmer text after question is answered
    this.resumeText = this.add.text(
      game.config.width * 0.35,
      game.config.height * 0.2,
      '',
      {
        fontFamily: 'Montserrat',
        font: 'bold 50px Montserrat',
        fill: '#1f2a55',
      },
    );

    this.resumeText.visible = false;

    // adding the timertext fot the game at the top left canvas
    this.timeText = this.add.text(
      game.config.width * 0.13,
      game.config.height * 0.075,
      '',
      {
        fontFamily: 'Montserrat',
        font: 'bold 30px Montserrat',
        fill: '#1f2a55',
      },
    );

    // adding static timer icon at top left corner
    this.staticTimer = this.physics.add.sprite(
      game.config.width * 0.1,
      game.config.height * 0.1,
      'timer',
    );
    this.staticTimer.body.setAllowGravity(false);
    this.staticTimer.displayWidth = 50;
    this.staticTimer.displayHeight = 50;
    this.timeText.fixedToCamera = true;
    this.timer = this.time.addEvent({
      delay: 3600000,
      startAt: 0,
    });

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(
      game.config.width,
      game.config.width / 2,
      game.config.height * gameOptions.platformVerticalLimit[1],
    );

    // adding the player;
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      game.config.height / 2,
      'dude',
    );

    this.player.setScale(0.9); // change in full screen

    // adding static coin icon at top right corner
    this.staticCoin = this.physics.add.sprite(
      game.config.width / 1.4,
      game.config.height * 0.1,
      'star',
    );
    this.staticCoin.body.setAllowGravity(false);
    this.staticCoin.displayWidth = 50 * window.devicePixelRatio;
    this.staticCoin.displayHeight = 50 * window.devicePixelRatio;
    this.scoreText = this.add.text(
      game.config.width * 0.75,
      game.config.height * 0.079,
      this.coins,
      {
        font: 'bold 30px Montserrat',
        fill: '#1f2a55',
      },
    );

    // setting player bounce when it collides with platform
    this.player.setGravityY(gameOptions.playerGravity);
    this.cursors = this.input.keyboard.addKey('SPACE');

    // setting collisions between the player and the platform group
    this.player.anims.play('run');
    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      function(player, platform) {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run');
        }
      },
      null,
      this,
    );

    // setting up the collision and overlap props
    this.physics.add.collider(this.coinGroup, this.platformGroup);
    this.physics.add.collider(this.quesGroup, this.platformGroup);
    this.physics.add.overlap(
      this.player,
      this.coinGroup,
      this.collectStar,
      null,
      this,
    );
    this.physics.add.overlap(
      this.player,
      this.quesGroup,
      this.collectQues,
      null,
      this,
    );
    this.physics.add.overlap(
      this.player,
      this.fireGroup,
      function(player, fire) {
        this.dying = true;
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
        fire.disableBody(true, true);
        player.anims.stop();
        player.setFrame(4);
        player.setTint(0x234567);
        player.setDepth(9);
        player.body.setVelocity(0, -300);
        this.cursors.enabled = false;
        this.physics.world.removeCollider(this.platformCollider);
      },
      null,
      this,
    );
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 30, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1],
        ) * -1,
      );
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1],
    );

    if (this.addedPlatforms > 1) {
      const check = Phaser.Math.Between(1, 100);
      if (check <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coinGrouping = Phaser.Math.Between(0, 2);
          let coin1;
          let coin2;
          let coin3;
          coin1 = coin2 = coin3 = null;
          const coin = [coin1, coin2, coin3];
          let j = -40;
          for (let i = 0; i <= coinGrouping; i++) {
            coin[i] = this.physics.add.sprite(
              posX + j,
              posY - 40 + Phaser.Math.Between(-30, -10),
              'star',
            );
            coin[i].setImmovable(true);
            coin[i].setVelocityX(platform.body.velocity.x);
            coin[i].displayWidth = 40;
            coin[i].displayHeight = 40;
            this.coinGroup.add(coin[i]);
            j += 40;
          }
        }
      } else if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - 10;
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - 10, posY - 40, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          fire.setDepth(2);
          fire.displayWidth = 40;
          fire.displayHeight = 50;
          this.fireGroup.add(fire);
        }
      }

      if (check <= gameOptions.quesPercent) {
        if (this.quesPool.getLength()) {
          const ques = this.quesPool.getFirst();
          ques.x = posX;
          ques.y = posY - 112;
          ques.alpha = 1;
          ques.active = true;
          ques.visible = true;
          this.quesPool.remove(ques);
        } else {
          const ques = this.physics.add.sprite(posX, posY - 40, 'ques');
          ques.setImmovable(true);
          ques.setVelocityX(platform.body.velocity.x);
          ques.displayWidth = 45;
          ques.displayHeight = 50;
          this.quesGroup.add(ques);
        }
      }
    }
  }

  // allows the player to jump above
  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  // resuming in timer to resume the question.
  resumingInTimer() {
    this.correctText.setText(`+${this.bonus1}\nCorrect!`);
    this.askingQuestion = true;
    this.resumeQuestion = false;
    this.physics.pause();
    const timeId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.player.setFrame(4);
        this.resumeText.visible = true;
        this.resumeText.setText(`Resuming in \n          ${this.timeLeft}`);
        this.timeLeft -= 1;
      } else {
        this.physics.resume();
        this.resumeText.visible = false;
        this.timer.paused = false;
        this.askingQuestion = false;
        this.timeLeft = 3;
        this.resumeQuestion = false;
        this.bonus1 = 15;
        this.music.resume();

        clearTimeout(timeId);
      }
    }, 800);
  }

  // updates the timer at the top left corner
  updateTimer() {
    const timeElapsed = Math.floor(this.timer.getElapsedSeconds());
    this.minute = Math.floor(timeElapsed / 60);
    this.seconds = timeElapsed % 60;

    if (this.minute < 10) {
      this.minute = this.minute;
    }
    if (this.seconds < 10) {
      this.seconds = `0${this.seconds}`;
    }

    this.timeText.setText(`${this.minute}m ${this.seconds}sec`);
  }

  update() {
    if (this.askingQuestion || this.fallOver) {
      this.mountainsBack.tilePositionX += 0;
      this.mountainsMid.tilePositionX += 0;
      this.mountainsFront.tilePositionX += 0;
    } else {
      this.mountainsBack.tilePositionX += 0.05;
      this.mountainsMid.tilePositionX += 0.3;
      this.mountainsFront.tilePositionX += 0.75;
    }

    // resume Resuming in  Timer when variable is true
    if (this.resumeQuestion) {
      this.resumingInTimer();
    }

    // update timer on fps.
    this.updateTimer();

    if (this.cursors.isDown) {
      this.jump();
      this.cursors.isDown = false;
    }

    // game over when player falls below the platform
    if (this.player.y > game.config.height && this.counter === 0) {
      this.fallOver = true;
      this.death.play();
      gameOver(this.index, game, true);
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = game.config.width;
    let rightmostPlatformHeight = 0;

    try {
      this.platformGroup.getChildren().forEach(platform => {
        const platformDistance =
          game.config.width - platform.x - platform.displayWidth / 2;
        if (platformDistance < minDistance) {
          minDistance = platformDistance;
          rightmostPlatformHeight = platform.y;
        }
        if (platform.x < -platform.displayWidth / 2) {
          this.platformGroup.killAndHide(platform);
          this.platformGroup.remove(platform);
        }
      }, this);

      this.coinGroup.getChildren().forEach(function(coin) {
        if (coin.x < -coin.displayWidth / 2) {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        }
      }, this);

      this.quesGroup.getChildren().forEach(function(ques) {
        if (ques.x < -ques.displayWidth / 2) {
          this.quesGroup.killAndHide(ques);
          this.quesGroup.remove(ques);
        }
      }, this);

      this.fireGroup.getChildren().forEach(function(fire) {
        if (fire.x < -fire.displayWidth / 2) {
          this.fireGroup.killAndHide(fire);
          this.fireGroup.remove(fire);
        }
      }, this);

      // adding new platforms
      if (minDistance > this.nextPlatformDistance) {
        const nextPlatformWidth = Phaser.Math.Between(
          gameOptions.platformSizeRange[0],
          gameOptions.platformSizeRange[1],
        );
        const platformRandomHeight =
          gameOptions.platformHeighScale *
          Phaser.Math.Between(
            gameOptions.platformHeightRange[0],
            gameOptions.platformHeightRange[1],
          );
        const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
        const minPlatformHeight =
          game.config.height * gameOptions.platformVerticalLimit[0];
        const maxPlatformHeight =
          game.config.height * gameOptions.platformVerticalLimit[1];
        const nextPlatformHeight = Phaser.Math.Clamp(
          nextPlatformGap,
          minPlatformHeight,
          maxPlatformHeight,
        );
        this.addPlatform(
          nextPlatformWidth,
          game.config.width + nextPlatformWidth / 2,
          nextPlatformHeight,
        );
      }
    } catch (e) {
      game.scene.start('GameOver', {
        coins: this.coins,
        currentCoin: this.currentCoin,
        currentGain: this.currentGain,
        gain: this.gain,
        text: 'YOU DIED, GAME OVER',
        initialise: this.initialise,
      });
    }
  }
}
