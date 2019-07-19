import { mode } from '../loginin/firebase';
import { game, gameOptions } from '../invader';
import jsLoader, { jsData } from './jsLoader';
import htmlLoader, { htmlData } from './htmlLoader';
import cssLoader, { cssData } from './cssLoader';

let question = null;
let isDeadPlayer = null;
let mcqAnswerState = {};
let fillAnswerState = {};
let questionData = null;
let qInterval;
let qTimeout;

const javascript = () => {
  jsLoader();
  questionData = jsData;
};
const html = () => {
  htmlLoader();
  questionData = htmlData;
};
const css = () => {
  cssLoader();
  questionData = cssData;
};

const showPurchaseModal = callback => {
  const playScene = game.scene.getScene('PlayGame');
  document.querySelector('#game').classList.add('modalway');
  if (playScene.coins < 100) {
    document.getElementById('purchase_me').disabled = true;
    document.getElementById('purchase_me').style.pointerEvents = 'none';
    document.getElementById('purchase_me').style.opacity = 0.5;
  } else {
    document.getElementById('purchase_me').disabled = false;
    document.getElementById('purchase_me').style.pointerEvents = 'auto';
    document.getElementById('purchase_me').style.opacity = 1;
  }
  playScene.cursors.isDown = false;
  playScene.player.setVelocityY(0);
  game.scene.pause('PlayGame');

  document.querySelector('.purchase').classList.remove('hide-purchase');
  document.querySelector('.purchase').classList.add('show-purchase');

  const modal = document.querySelector('.show-purchase');
  modal ? (modal.style.display = 'block') : null;
  const currentCoinValue = document.querySelector('.coin_value');
  currentCoinValue.innerHTML = playScene.coins;

  const id = setInterval(() => {
    console.log(playScene.isPurchased);
    if (playScene.isPurchased === 1) {
      clearInterval(id);
      console.log('purchase true set interval');
      callback(1);
    }
    if (playScene.isPurchased === 2) {
      clearInterval(id);
      callback(2);
    }
  }, 100);
};

const coinData = async bonus => {
  const modeScene = game.scene.getScene('ModeSelectScene');
  const playScene = game.scene.getScene('PlayGame');

  const COIN_UPDATION_URL =
    'https://api-dev.campk12.live/protected/user/updateUserCoins';
  const COIN_DATA = {
    coins: `${bonus}`,
  };

  const x = await fetch(COIN_UPDATION_URL, {
    method: 'PUT',
    body: JSON.stringify(COIN_DATA),
    headers: {
      Authorization: `Bearer ${modeScene.MEDIUM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'https://campk12.live',
    },
  }).catch(err => console.error(err));
};

const dontEndGame = () => {
  console.log('inside dont end game');
  const playScene = game.scene.getScene('PlayGame');
  playScene.isPurchased = 1;
  playScene.coins -= 100;
  playScene.currentGain -= 100;
  document.querySelector('.purchase').classList.add('hide-purchase');
  const modal = document.querySelector('.show-purchase');
  modal ? (modal.style.display = 'none') : null;
  document.querySelector('.purchase').classList.remove('show-purchase');
};

const endGame = () => {
  const playScene = game.scene.getScene('PlayGame');
  playScene.isPurchased = 2;
  document.querySelector('.purchase').classList.add('hide-purchase');
  const modal = document.querySelector('.show-purchase');
  modal ? (modal.style.display = 'none') : null;
  document.querySelector('.purchase').classList.remove('show-purchase');
};

const mcqHandler = (question, option) => {
  question.option.map((answer, id) => {
    const div = document.createElement('div');
    const theInput = document.createElement('input');
    const label = document.createElement('label');
    div.setAttribute('class', 'option-wrapper');
    theInput.setAttribute('type', 'radio');
    theInput.setAttribute('name', 'answer');
    theInput.setAttribute('value', id);
    theInput.setAttribute('id', `${id}-a`);
    label.setAttribute('for', `${id}-a`);
    label.innerHTML += `<span class='options'> ${answer} </span><br>`;
    div.appendChild(theInput);
    div.appendChild(label);
    div.id = id;
    div.addEventListener('mousedown', () => optionClicked(div.id));
    option.appendChild(div);
  });
};

const fitbHandler = (question, option) => {
  const div = document.createElement('div');
  const fillintheblank = document.createElement('span');
  fillintheblank.setAttribute('class', 'fill-in');
  div.setAttribute('id', 'fill-id');
  question.questionPart2 = question.questionPart2
    .split('<')
    .join('&lt;')
    .split('>')
    .join('&gt;')
    .split('\n')
    .join('<br>')
    .split('\t')
    .join('&nbsp;&nbsp;&nbsp;&nbsp;');
  fillintheblank.innerHTML = question.questionPart2;
  div.appendChild(fillintheblank);
  option.appendChild(div);

  const initialString = fillintheblank.innerHTML.slice(
    0,
    fillintheblank.innerHTML.indexOf('__'),
  );
  const endString = fillintheblank.innerHTML.slice(
    fillintheblank.innerHTML.indexOf('__') + 2,
  );

  fillintheblank.innerHTML = `${initialString}<input type="text" class="answer-field" />${endString}`;

  document
    .querySelector('.answer-field')
    .addEventListener('keyup', e => fillupHandler(e));
};

const pushQuestion = (i, game, isDead, arrayIndices, removeTimer) => {
  const playScene = game.scene.getScene('PlayGame');
  document.querySelector('#game').classList.add('modalway');
  playScene.cursors.isDown = false;
  playScene.player.setVelocityY(0);
  let text = 15;
  document.querySelector('.submit-btn').style.display = 'block';
  document.querySelector('.modal-footer').style.display = 'flex';

  if (!removeTimer) {
    document.getElementById('timer').style.display = 'block';
    document.getElementById('timer').innerHTML = `00m ${text}s`;
    text--;
  } else {
    document.getElementById('timer').style.display = 'none';
  }
  game.scene.pause('PlayGame');

  if (playScene.chances === 0 && removeTimer) {
    const head = document.querySelector('.modal-info-life');
    head.style.display = 'block';

    const life = document.querySelector('.life-text');
    const header = document.querySelector('.modal-header');
    header.style.marginTop = '40px';
    life.style.display = 'block';
    life.innerHTML = `ANSWER THIS CORRECTLY TO RE-ENTER THE GAME`;
  }

  if (!removeTimer) {
    qInterval = setInterval(function() {
      document.querySelector('.coin-value').innerHTML = text;
      playScene.bonus1 = text;
      document.getElementById('timer').innerHTML = `00m ${text}s`;
      text--;
    }, 1000);

    qTimeout = setTimeout(function() {
      clearInterval(qInterval);
      clearTimeout(qTimeout);
      if (question.questionType == 'MCQ') {
        question.option.map((_, id) => {
          const mcqRemove = document.getElementById(id);
          mcqRemove.parentNode.removeChild(mcqRemove);
        });
      } else {
        const fillRemove = document.getElementById('fill-id');
        fillRemove.parentNode.removeChild(fillRemove);
      }
      if (playScene.lastChance) {
        overGame();
      } else {
        resumeGame();
      }
    }, 15000);
  }

  document.querySelector('.modal-dialog').classList.remove('hideModal');
  document.querySelector('.modal-dialog').classList.add('showModal');
  const modal = document.querySelector('.showModal');
  modal ? (modal.style.display = 'block') : null;
  playScene.index += 1;
  playScene.counter += 1;
  playScene.quesCollision += 1;
  playScene.timer.paused = true;
  playScene.modalNotAlive = false;
  isDeadPlayer = isDead;

  switch (mode) {
    case 'javascript':
      javascript();
      break;
    case 'html':
      html();
      break;
    case 'css':
      css();
      break;
  }

  question = questionData;
  const questions = document.querySelector('.question');
  const questionsTitle = document.querySelector('.questionTitle');
  const option = document.querySelector('.modal-option');

  if (question.questionType === 'MCQ') {
    question.question = question.question
      .split('<')
      .join('&lt;')
      .split('>')
      .join('&gt;')
      .split('\n')
      .join('<br>')
      .split('\t')
      .join('&nbsp;&nbsp;&nbsp;&nbsp;');
    questions.innerHTML = question.question;
    questionsTitle.innerHTML = question.questionTitle;
    document.querySelector('.submit-btn').style.display = 'none';
    mcqHandler(question, option);
  } else {
    questions.innerHTML = '';
    questionsTitle.innerHTML = question.questionTitle;
    fitbHandler(question, option);
  }

  document.querySelector('body').addEventListener('keyup', e => checkAnswer(e));
};

// fill in the blank event handler
function fillupHandler(e) {
  if (e.target.value !== '') fillAnswerState.yourAnswer = e.target.value;
}

// option buttons event mcq
function optionClicked(id) {
  document.getElementById(`${id}-a`).checked = true;
  mcqAnswerState.yourAnswer = Number(id);
  submit();
}

// check key code to submit answer (enter button)
function checkAnswer(e) {
  if (e.keyCode === 13) {
    question.questionType === 'MCQ'
      ? mcqAnswerState.yourAnswer === undefined || submit()
      : fillAnswerState.yourAnswer === undefined || submit();
  }
}

// unlock hint for question
const unlockHint = async () => {
  const playScene = game.scene.getScene('PlayGame');

  if (playScene.coins >= 10 && playScene.unlockHintCounter === 0) {
    document.querySelector('.unlock-btn').style.display = 'none';
    const hintText = document.querySelector('.hint-text');
    const hintModal = document.querySelector('.modal-hint');
    hintModal.classList.remove('hide-hint');
    hintText.innerHTML =
      question.hintType === 'POPUP'
        ? question.hint
        : 'A part of the answer is being inserted into the text field';
    question.hintType === 'POPUP' ||
      (document.querySelector('.answer-field').value = question.hint);

    const coin = playScene.coins - 10;
    const cGain = playScene.currentGain - 10;
    const gain = playScene.gain - 10;
  
    if (coin < 0) {
      playScene.coins = 0;
      playScene.currentGain = 0;
    } else {
      playScene.coins = coin;
      playScene.currentGain = cGain;
      playScene.gain = gain;
    }
    playScene.unlockHintCounter++;
    playScene.scoreText.setText(playScene.coins);
  } else if (playScene.unlockHintCounter === 0) {
    const unlockAlert = document.querySelector('.modal-alert');
    unlockAlert.classList.remove('hide-alert');
  }
};

// resume the paused game after ques is answered
const resumeGame = () => {
  document.querySelector('#game').classList.remove('modalway');

  document.querySelector('.coin-value').innerHTML = 15;
  const playScene = game.scene.getScene('PlayGame');
  playScene.player.anims.play('front');

  const header = document.querySelector('.modal-header');
  header.style.marginTop = '0px';
  const modal = document.querySelector('.showModal');
  modal ? (modal.style.display = 'none') : null;
  document.querySelector('.modal-dialog').classList.add('hideModal');

  const hintModal = document.querySelector('.modal-hint');
  const unlockAlert = document.querySelector('.modal-alert');
  document.querySelector('.modal-info').style.display = 'none';
  document.querySelector('.modal-info-life').style.display = 'none';
  document.querySelector('.unlock-btn').style.display = 'block';

  playScene.resumeQuestion = true;
  mcqAnswerState = {};
  fillAnswerState = {};
  playScene.counter = 0;
  playScene.quesCollision = 0;
  playScene.askingQuestion = false;
  playScene.modalNotAlive = true;
  playScene.unlockHintCounter = 0;

  if (playScene.index === questionData.length) {
    playScene.index = 0;
  }

  hintModal.classList.add('hide-hint');
  unlockAlert.classList.add('hide-alert');
  game.scene.resume('PlayGame');
};

// when height becomes less than the platform
function gameOver(i, game, isDead, arrayIndices) {
  const playScene = game.scene.getScene('PlayGame');

  // chances are over
  playScene.chances--;
  if (playScene.lastChance && playScene.chances === -1) {
    playScene.fallOver = false;
    overGame();
    return 0;
  }

  if (playScene.chances >= 0) {
    if (playScene.chances === 0) {
      playScene.lastChance = true;
    }
    if (playScene.deletingLife === false) {
      playScene.deletingLife = true;

      // looks at the heart image at top right corner
      let lifeCounter = 0;
      const comparelife = playScene.chances;
      playScene.lives.children.iterate(life => {
        lifeCounter++;
        if (lifeCounter <= comparelife) {
          life.visible = true;
        } else {
          life.visible = false;
        }
      });

      // respawn the player at the start of the first platform in game view
      let spawnY;
      let spawnX;
      let allocated = false;
      playScene.physics.pause();
      playScene.player.anims.pause();
      playScene.player.setFrame(4);
      playScene.platformGroup.children.iterate(platform => {
        if (platform.body.x >= 50 && platform.body.center.x > 0 && !allocated) {
          allocated = true;
          spawnX = platform.body.x;
          spawnY = platform.body.center.y - 80;
        }
      });
      playScene.dying = false;
      playScene.player.clearTint();
      gameOptions.playerStartPosition = spawnX;
      playScene.player.y = spawnY;
      setTimeout(() => {
        playScene.fallOver = false;
        playScene.platformCollider = playScene.physics.add.collider(
          playScene.player,
          playScene.platformGroup,
          () => {
            if (!playScene.player.anims.isPlaying) {
              playScene.player.anims.play('run');
            }
          },
          null,
        );
        playScene.cursors.enabled = true;
        playScene.physics.resume();
      }, 1000);
      playScene.deletingLife = false;

      if (playScene.chances === 0) {
        showPurchaseModal(p => {
          if (p === 1) {
            playScene.askingQuestion = true;
            console.log('resumin game');
            game.scene.resume('PlayGame');
            pushQuestion(i, game, isDead, arrayIndices, true);
          }
          if (p === 2) {
            overGame(); // player intentionally ends;
          }
        }); // player gets prompt for purchase
      }
    }
  } else {
    gameOptions.playerStartPosition = 200;
  }
}

async function overGame() {
  document.querySelector('#game').classList.remove('modalway');

  const playScene = game.scene.getScene('PlayGame');
  const modal = document.querySelector('.showModal');
  modal ? (modal.style.display = 'none') : null;
  document.querySelector('.modal-dialog').classList.add('hideModal');
  clearInterval(qInterval);
  clearTimeout(qTimeout);

  playScene.music.stop();
  game.scene.stop('PlayGame');
  playScene.initialise('GameOver');
  game.scene.start('GameOver', {
    coins: playScene.coins,
    currentCoin: playScene.currentCoin,
    currentGain: playScene.currentGain,
    gain: playScene.gain,
    text: 'YOU DIED, GAME OVER',
    initialise: playScene.initialise,
  });
}

const answerIsTrue = async (playScene, coins, currentGain) => {
  const bonus = playScene.bonus1;
  playScene.gain = playScene.gain + bonus;
  if (playScene.coins >= 0) {
    playScene.coins = coins + bonus;
    playScene.currentGain = currentGain + bonus;
    playScene.scoreText.setText(playScene.coins);
  }

  playScene.animateText(playScene.correctText);
  if (isDeadPlayer) {
    playScene.dying = false;
    playScene.player.clearTint();
    resumeGame();
  } else {
    resumeGame();
  }
};

const answerIsFalse = async (playScene, coins, currentGain) => {
  playScene.gain = playScene.gain - 10;
  if (playScene.coins > 0) {
    const bonus = -10;
    const coin = coins + bonus;
    const cGain = currentGain + bonus;
    if (coin < 0) {
      playScene.coins = 0;
      playScene.currentGain = 0;
    } else {
      playScene.coins = coin;
      playScene.currentGain = cGain;
    }
    playScene.scoreText.setText(playScene.coins);
  }
  playScene.animateText(playScene.incorrectText);
  if (playScene.lastChance) {
    overGame();
    return 0;
  }
  if (!isDeadPlayer) {
    resumeGame();
  } else {
    overGame();
  }
};

const mcqAnswerCheck = playScene => {
  const { coins } = playScene;
  const { currentGain } = playScene;
  question.option.map((_, id) => {
    const mcqRemove = document.getElementById(id);
    mcqRemove.parentNode.removeChild(mcqRemove);
  });

  if (mcqAnswerState.yourAnswer === question.answer) {
    answerIsTrue(playScene, coins, currentGain);
  } else {
    answerIsFalse(playScene, coins, currentGain);
  }
};

const fillupAnswerCheck = playScene => {
  const { coins } = playScene;
  const { currentGain } = playScene;
  const fillRemove = document.getElementById('fill-id');
  fillRemove.parentNode.removeChild(fillRemove);

  if (fillAnswerState.yourAnswer === question.answer) {
    answerIsTrue(playScene, coins, currentGain);
  } else {
    answerIsFalse(playScene, coins, currentGain);
  }
};

// submit the answer choosen
function submit() {
  const playScene = game.scene.getScene('PlayGame');
  clearInterval(qInterval);
  clearTimeout(qTimeout);
  const currentAnswerState =
    question.questionType === 'MCQ'
      ? mcqAnswerState.yourAnswer
      : fillAnswerState.yourAnswer;

  if (currentAnswerState !== undefined) {
    const modal = document.querySelector('.showModal');
    modal ? (modal.style.display = 'none') : null;
    document.querySelector('.modal-dialog').classList.add('hideModal');

    if (question.questionType === 'MCQ') {
      mcqAnswerCheck(playScene);
    } else {
      fillupAnswerCheck(playScene);
    }
  } else {
    document.querySelector('.modal-info').style.display = 'block';
  }
}

export {
  coinData,
  gameOver,
  pushQuestion,
  submit,
  unlockHint,
  overGame,
  endGame,
  dontEndGame,
};
