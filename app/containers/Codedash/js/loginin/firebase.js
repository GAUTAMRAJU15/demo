/* eslint-disable camelcase */
import nameRegister from '../registerPlayer';
import ModeSelectScene from '../scenes/PlayScene/ModeSelect';

let mode = null;
let userId_1 = null;

function startGame(initialise, counter) {
  if (localStorage.getItem('authToken')) {
    const url = 'https://api-dev.campk12.live/protected/user/getUserCoins';
    fetch(url, {
      method: 'POST',
      headers: {
        Expect: '100-continue',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const userBasicProfile = response.body;
        userId_1 = userBasicProfile._id;
        const username = userBasicProfile.common.name;
        const coins = userBasicProfile.common.coins;
        const picture = userBasicProfile.common.picture.croppedImage;
        const token = localStorage.getItem('authToken');
        await nameRegister(
          username,
          coins,
          picture,
          token,
          initialise,
          counter,
        );
      })
      .catch(error => {
        callError();
      });
  }
}

function selectMode(e) {
  mode = e;
  mode && new ModeSelectScene(e);
}

export { startGame, mode, selectMode, userId_1 };
