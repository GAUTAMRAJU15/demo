import ModeSelectScene from './scenes/PlayScene/ModeSelect';
import PreLoadScene from './scenes/PlayScene/preLoadScene';
import PlayGame from './scenes/PlayScene/PlayGame';
import GameOverScene from './scenes/GameOverScene/GameOver';


let game;


// global game options
const gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [270, 270],

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 170],

  // platform width range, in pixels
  platformSizeRange: [200, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  // player starting X position
  playerStartPosition: 200,

  // consecutive jumps allowed
  jumps: 2,

  // % of probability a coin appears on the platform
  coinPercent: 50,

  // % of probability a ques box appears on the platform
  quesPercent: 30,

  // % of probability a ques box appears on the fire
  firePercent: 50,
};

class Games {
  CONFIG = {
    type: Phaser.AUTO,
    width: (window.innerWidth - 570) * window.devicePixelRatio,
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

  createGame() {
    game = new Phaser.Game(this.CONFIG);
    return game;
  }

  destroyGame() {
    game.destroy(true);
    game.events.on("destroy",()=>{
      game = undefined;
    });
  }
}

export { game, gameOptions };
export default Games;
