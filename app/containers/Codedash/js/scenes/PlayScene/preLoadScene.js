import { PRE_SCENE_KEY } from '../../constants/sceneKeys';
import { game } from '../../invader';
import fireImg from '../../../assets/images/fire.png';
import platformImg from '../../../assets/images/platform1.png';
import dudeImg from '../../../assets/images/dude1.png';
import ModeSelectScene from './ModeSelect';
// import Phaser from "phaser";

export default class PreLoadScene extends Phaser.Scene {
  constructor() {
    super(`${PRE_SCENE_KEY}`);
  }

  init(data) {
    document
      .querySelector('body')
      .removeEventListener('keyup', new ModeSelectScene().callme);
    this.currentGain = 0;
    this.coins = data.data.coins || 0;
    this.name = data.data.name;
    this.index = 0;
    this.mode = data.data.mode;
    this.id = data.data.id;
    this.totalSecondsUsed = data.data.totalSecondsUsed;
    this.initialise = data.data.initialise;
    this.counter = data.data.counter;
  }

  preload() {}

  create() {
    this.textures.addBase64('platform', platformImg);
    const shardImage = new Image();
    const dudeImage = new Image();
    shardImage.onload = () => {
      this.textures.addSpriteSheet('fire', shardImage, {
        frameWidth: 40,
        frameHeight: 70,
      });

      this.anims.create({
        key: 'burn',
        frames: this.anims.generateFrameNumbers('fire', {
          start: 0,
          end: 4,
        }),
        frameRate: 10,
        repeat: -1,
      });
    };
    shardImage.src = fireImg;

    dudeImage.onload = () => {
      this.textures.addSpriteSheet('dude', dudeImage, {
        frameWidth: 45,
        frameHeight: 60,
      });

      this.anims.create({
        key: 'front',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 1,
      });
      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
    };
    dudeImage.src = dudeImg;

    game.scene.stop(`${PRE_SCENE_KEY}`);
    game.scene.start('PlayGame', {
      data: {
        name: this.name,
        coins: this.coins,
        id: this.id,
        mode: this.mode,
        currentGain: this.currentGain,
        totalSecondsUsed: this.totalSecondsUsed,
        initialise: this.initialise,
        counter: this.counter,
      },
    });
  }
}
