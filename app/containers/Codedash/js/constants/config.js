/* eslint-disable import/no-cycle */
// import Phaser from 'phaser';
import ModeSelectScene from '../scenes/PlayScene/ModeSelect';
import PreLoadScene from '../scenes/PlayScene/preLoadScene';
import PlayGame from '../scenes/PlayScene/PlayGame';
import GameOverScene from '../scenes/GameOverScene/GameOver';

const CONFIG = {
  type: Phaser.AUTO,
  width: 780 * window.devicePixelRatio,
  height: 500 * window.devicePixelRatio,
  scene: [ModeSelectScene, PreLoadScene, PlayGame, GameOverScene],
  backgroundColor: 0x0c88c7,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
    width: 1334,
    height: 750,
  },
  physics: {
    default: 'arcade',
  },
};

export default CONFIG;
