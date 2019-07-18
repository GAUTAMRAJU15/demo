import { game } from './invader';
import { mode } from './loginin/firebase';

async function nameRegister(
  player,
  coins,
  picture,
  token,
  initialise,
  counter,
) {
  document.querySelector('.gamestart-modal').style.display = 'none';
  document.querySelector('canvas').style.display = 'block';

  // retreive the data from the user and started the game
  console.log('name registere', initialise, counter, game);
  game.scene.start('ModeSelectScene', {
    data: {
      name: player,
      coins,
      id: 'key',
      mode,
      currentGain: 0,
      totalSecondsUsed: 0,
      picture,
      token,
      initialise,
      counter,
    },
  });
}

export default nameRegister;
