import { MODE_SCENE_KEY } from '../../constants/sceneKeys';
import { game } from '../../invader';
import Sky from '../../../assets/images/sky1.png';

export default class ModeSelectScene extends Phaser.Scene {
  mode = null;

  constructor(data) {
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
      this.counter = data.data.counter;
    }
  }

  preload() {
    this.load.image('sky', Sky);
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
          counter: gg.counter,
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
          mod.style.width = '710px';
          mod.style.height = '450px';
          mod.style.top = '70%';
          mod.style.left = '50%';
          mod.style.marginTop = '-100px';
          mod.style.marginLeft = '-10px';
          mod.style.maxHeight = 'none';
        }

        if (purchase) {
          purchase.style.top = '400px';
          purchase.style.left = '44%';
        }

        if (!(fullscreenElement && fullscreenEnabled)) {
        game.style.background = "none";
          launchIntoFullscreen(document.getElementById('game'));
        }
      },
      this,
    );
  }
}
