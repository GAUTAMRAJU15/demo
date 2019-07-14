import CONFIG from './constants/config';
// import Phaser from "phaser";

let game;
let screenAdjust = {}; // screen object popluates  with value according to the screen mode

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

const setGameScreenState = screenstate => {
  screenAdjust = screenstate;
  console.log(screenAdjust);
};

class Games {
  static createGame() {
    console.log('game creation phaser called with config');
    game = new Phaser.Game(CONFIG);
    return game;
  }

  static destroyGame(game) {
    game.destroy();
  }
}

export { game, gameOptions, screenAdjust, setGameScreenState };
export default Games;
