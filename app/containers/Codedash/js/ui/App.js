/* eslint-disable no-undef */
/* eslint-disable indent */
import React from 'react';
import Canvas from './components/Canvas/Canvas';
import Over from './containers/GameOver/GameOver';
import Play from './containers/PlayBoi/play';
import Mode from './containers/PlayBoi/Mode';
import { game } from '../invader';

import * as sceneKeys from '../constants/sceneKeys';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sceneKey: null,
    };
  }

  counter = false;

  resize = () => {
    const w = this.counter ? window.innerWidth : 780;
    const h = this.counter ? window.innerHeight : 500;

    this.counter = !this.counter;
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const windowWidth = w * devicePixelRatio;
      const windowHeight = h * devicePixelRatio;
      const windowRatio = windowWidth / windowHeight;
      const gameRatio = game.config.width / game.config.height;
      if (windowRatio < gameRatio) {
        canvas.style.width = `${windowWidth}px`;
        canvas.style.height = `${windowWidth / gameRatio}px`;
      } else {
        canvas.style.width = `${windowHeight * gameRatio}px`;
        canvas.style.height = `${windowHeight}px`;
      }
      if (game.renderType === 1) {
        game.renderer.resize(width, height);
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
      }
    }
  };

  componentDidMount() {
    console.log('mount');

    this.initialiseGame(sceneKeys.MODE_SCENE_KEY);
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  initialiseGame = key => {
    this.setState({
      sceneKey: key,
    });
  };

  switchScene(sceneKey) {
    let scene = null;
    console.log(sceneKey);
    switch (this.state.sceneKey) {
      case sceneKeys.MODE_SCENE_KEY:
        scene = (
          <Mode
            sceneKey={sceneKeys.MODE_SCENE_KEY}
            initialiseGame={this.initialiseGame}
          />
        );
        break;
      case sceneKeys.PLAY_SCENE_KEY:
        scene = (
          <Play
            sceneKey={sceneKeys.PLAY_SCENE_KEY}
            initialiseGame={this.initialiseGame}
          />
        );
        break;
      case sceneKeys.OVER_SCENE_KEY:
        scene = (
          <Over
            sceneKey={sceneKeys.OVER_SCENE_KEY}
            initialiseGame={this.initialiseGame}
          />
        );
        break;
      default:
        scene = (
          <Mode
            sceneKey={sceneKeys.MODE_SCENE_KEY}
            initialiseGame={this.initialiseGame}
          />
        );
        break;
    }

    return scene;
  }

  render() {
    return (
      <>
        <Canvas />
        <div id={this.state.sceneKey}>
          {this.switchScene(this.state.sceneKey)}
        </div>
      </>
    );
  }
}

export default App;
