import { MODE_SCENE_KEY } from '../../constants/sceneKeys';
import { game } from '../../invader';
// import Phaser from "phaser";
import Sky from '../../../assets/images/sky1.png';

export default class ModeSelectScene extends Phaser.Scene {
  mode = null;

  constructor(data) {
    console.log('constructor mode');
    super(`${MODE_SCENE_KEY}`);
    this.mode = data;
    if (this.mode) {
      const space = document.querySelector('.gamestart-btn');
      document.querySelector('.select_mode_1').blur();
      space.style.display = 'block';
    }
  }

  init(data) {
    if (data.data !== undefined) {
      this.currentGain = 0;
      this.coins = data.data.coins || 0;
      this.name = data.data.name;
      this.index = 0;
      this.mode = data.data.mode;
      this.id = data.data.id;
      this.totalSecondsUsed = data.data.totalSecondsUsed;
      this.MEDIUM_ACCESS_TOKEN = data.data.token;
      this.initialise = data.data.initialise;
    }
  }

  preload() {
    this.load.image('sky', Sky);
    console.log(this.coins,"////");

  }

  callme(e) {
    const toProceed = document.querySelector('.gamestart-btn').style.display;
    if (e.keyCode === 32 && toProceed === 'block') {
      const gameStart = document.querySelector('.gamestart-modal');
      gameStart.style.display = 'none';
      const gg = game.scene.getScene('ModeSelectScene');
      game.scene.stop('ModeSelectScene');
      game.scene.start('Preload', {
        data: {
          name: gg.name,
          coins: gg.coins,
          id: gg.id,
          mode: gg.mode,
          currentGain: gg.currentGain,
          totalSecondsUsed: gg.totalSecondsUsed,
          initialise: gg.initialise,
        },
      });
    }
  }

  create() {
    const image = this.add.image(580, 235, 'sky');
    image.setScale(1).setScrollFactor(0);
    image.setAlpha(0.5);
    const gameStart = document.querySelector('.gamestart-modal');
    gameStart.style.display = 'block';
    document.querySelector('body').addEventListener('keyup', this.callme);
  }
}
