// import firebase from "firebase/app";
// import "firebase/database";
import nameRegister from '../registerPlayer';
import ModeSelectScene from '../scenes/PlayScene/ModeSelect';

let mode = null;
let userId_1 = null;

// (function(){

//     if(localStorage.getItem("authToken")) {
//       let url = "https://api-dev.campk12.live/protected/user/getUserCoins";
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Expect": "100-continue",
//           "Authorization" : `Bearer ${localStorage.getItem("authToken")}`,
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         }
//       })
//         .then(res => res.json())
//         .then(async response => {
//           let userBasicProfile  = response.body;
//           userId_1 = userBasicProfile._id;
//           let username = userBasicProfile.common.name;
//           let coins = userBasicProfile.common.coins;
//           let picture = userBasicProfile.common.picture.croppedImage;
//           await nameRegister(username, coins, picture, localStorage.getItem("authToken"));
//         })
//         .catch(error => {
//           callError();
//         });
//     }
// })();

function startGame(stuRef, initialise) {
  const url = 'https://api-dev.campk12.live/public/auth/login';
  const data = {
    email: 'rajugautam45@gmail.com',
    password: 'Rr222111333666@',
  };

  let userBasicProfile = null;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'http://campk12.live',
    },
  })
    .then(res => res.json())
    .then(async response => {
      userBasicProfile = response.body.user;
      userId_1 = userBasicProfile._id;
      const username = userBasicProfile.common.name;
      const { coins } = userBasicProfile.common;
      const picture = userBasicProfile.common.picture.croppedImage;
      const { token } = response.body;
      localStorage.setItem('authToken', token);
      console.log(userBasicProfile, '////');
      await nameRegister(username, coins, picture, token, stuRef, initialise);
    })
    .catch(error => {
      console.error(error);
    });
}

function selectMode(e) {
  mode = e;
  mode && new ModeSelectScene(e);
}

export { startGame, mode, selectMode, userId_1 };
