import { game } from './invader';
import { mode } from './firebase/firebase';

async function nameRegister(player, coins, picture, token, stuRef, initialise) {
  const users = new Promise((resolve, reject) => {
    stuRef.on('value', function(snapshot) {
      const val = snapshot.val();
      resolve(val);
    });
  });

  const res = await users;

  // retrieve the game when the user is not in the db
  if (res != null) {
    const user = Object.values(res);
    const userIndex = user.findIndex(e => e.name === player);

    if (userIndex === -1) {
      // new user is created when the name is not in the db
      const { key } = stuRef.push();
      stuRef.child(key).set({
        name: player,
        coins,
        mode,
        id: key,
        totalSecondsUsed: 0,
        picture,
      });

      document.querySelector('canvas').style.display = 'block';
      console.log(coins);
      coins &&
        game.scene.start('ModeSelectScene', {
          data: {
            name: player,
            coins,
            id: key,
            mode,
            currentGain: 0,
            totalSecondsUsed: 0,
            token,
            initialise,
          },
        });
    } else {
      // retreive the data from the user and started the game

      document.querySelector('canvas').style.display = 'block';
      const data = user[userIndex];
      data.coins = coins;
      data.picture = picture;
      data.token = token;
      data.initialise = initialise;
      game.scene.start('ModeSelectScene', { data });
    }
  } else {
    const { key } = stuRef.push();
    stuRef.child(key).set({
      name: player,
      mode,
      coins,
      id: key,
      totalSecondsUsed: 0,
      picture,
    });

    document.querySelector('canvas').style.display = 'block';
    game.scene.start('ModeSelectScene', {
      data: {
        name: player,
        coins,
        id: key,
        mode,
        currentGain: 0,
        totalSecondsUsed: 0,
        picture,
        token,
        initialise,
      },
    });
  }
}

export default nameRegister;
