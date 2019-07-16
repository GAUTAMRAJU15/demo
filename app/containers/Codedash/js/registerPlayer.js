import { game } from './invader';
import { mode } from './firebase/firebase';

async function nameRegister(player, coins, picture, token, stuRef, initialise) {

  // let coin = coins < 0 ? 0 : coins;
        game.scene.start('ModeSelectScene', {
          data: {
            name: player,
            coins,
            id: "key",
            mode,
            currentGain: 0,
            totalSecondsUsed: 0,
            token,
            initialise,
          },
        });
    } 


export default nameRegister;
