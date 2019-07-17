// import Phaser from "phaser";
import { OVER_SCENE_KEY } from '../../constants/sceneKeys';
import { stuRef } from '../../ui/containers/PlayBoi/Mode';
import { coinData } from '../../questionModal/data';
import Sky from '../../../assets/images/sky1.png';
import { game } from '../../invader';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(`${OVER_SCENE_KEY}`);
  }

  init(data) {
    this.data = data;
    this.resumeQuestion = false;
    this.timeLeft = 3;
    this.timeOver = false;
    this.resumeTimer = null;
    this.askingQuestion = false;
    this.lastChance = false;
    this.modalNotAlive = true;
    this.quesCollison = 0;
    this.unlockHintCounter = 0;
    this.initialise = data.initialise;
    const playScene = game.scene.getScene('PlayGame');
    console.log('playScene', playScene, game.scene.scenes.playGame);
    playScene.music.stop();
    if (playScene.currentCoin + playScene.gain >= 0) {
      coinData(playScene.gain);
    } else {
      coinData(-this.data.currentCoin);
    }
  }

  preload() {
    this.load.image('sky', Sky);
  }

  timeFormatter(minute, second) {
    let secondsFetch = second % 60;
    secondsFetch =
      String(secondsFetch).length < 2 ? `0${secondsFetch}` : secondsFetch;
    const minutesFetch = String(minute).length < 2 ? minute : minute;

    return `${minutesFetch}m ${secondsFetch}s`;
  }

  create() {
    const image = this.add.image(580, 235, 'sky');
    const playScene = game.scene.getScene('PlayGame');
    image.setScale(1).setScrollFactor(0);
    image.setAlpha(0.5);
    const gameOver = document.querySelector('.gameover-modal');
    gameOver.style.display = 'block';

    const survivalText = document.querySelector('.timer-text');
    const coinText = document.querySelector('.gameover-cointext');
    const coinEarned = document.querySelector('.coins-session');
    const btn = document.querySelector('.gameover-btn');
    const info = document.querySelector('.modal-info-life');

    info.style.display = 'none';
    coinText.innerHTML = `${this.data.coins}`;
    coinEarned.innerHTML = `${this.data.gain}`;
    survivalText.innerHTML = this.timeFormatter(
      playScene.minute,
      playScene.seconds,
    );

    btn.addEventListener('click', () => {
      game.scene.stop('GameOver');
      document.querySelector('.modal-info-life').style.display = 'none';
      const hintModal = document.querySelector('.modal-hint');
      hintModal.classList.add('hide-hint');
      playScene.music.stop();
      game.scene.stop('GameOver');
      this.initialise('PlayGame');
      game.scene.start('PlayGame', {
        data: {
          name: game.scene.getScene('PlayGame').name,
          coins: game.scene.getScene('PlayGame').coins,
          id: game.scene.getScene('PlayGame').id,
          currentGain: 0,
          fromGameOver: 'false',
          initialise: this.initialise,
        },
      });
      gameOver.style.display = 'none';
    });
  }
}
