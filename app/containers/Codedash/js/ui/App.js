/* eslint-disable no-undef */
/* eslint-disable indent */
import React from 'react';
import Canvas from './components/Canvas/Canvas';
import Over from './containers/GameOver/GameOver';
import Play from './containers/PlayBoi/play';
import Mode from './containers/PlayBoi/Mode';
import { game } from '../invader';
import LeaderBoard from '../leaderboard/leaderboard';
import * as sceneKeys from '../constants/sceneKeys';
import DashRunner from '../../assets/dashRunner.svg';

import './App.scss';

class App extends React.Component {
  state = {
    sceneKey: null,
    showGame: true,
  };

  counter = false;

  resize = () => {
    if (window.innerWidth < 768) {
      this.setState({ showGame: false });
    } else {
      this.setState({ showGame: true });
    }


    const w = this.counter
      ? window.innerWidth
      : (window.innerWidth - 570) * window.devicePixelRatio;
    const h = this.counter ? window.innerHeight : 500;
    const canvas = document.querySelector('canvas');

    if (canvas) {
      const windowWidth = w;
      const windowHeight = h;
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
    this.initialiseGame(sceneKeys.MODE_SCENE_KEY);
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  initialiseGame = key => {
    this.setState({
      sceneKey: key,
    });
  };

  componentWillUnmount() {
    this.initialiseGame(null);
  }

  switchScene(sceneKey) {
    let scene = null;
    switch (sceneKey) {
      case sceneKeys.MODE_SCENE_KEY:
        scene = (
          <Mode
            sceneKey={sceneKeys.MODE_SCENE_KEY}
            initialiseGame={this.initialiseGame}
            counter={this.counter}
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
            counter={this.counter}
          />
        );
        break;
    }

    return scene;
  }

  render() {
    return (
      <div className="codedash-container">
        <div className="main-container">
          <div className="banner-container">
            <div className="content-container">
              <div className="codedash-header-container">
                <div className="codedash-primary-header">
                  <div className="primary-head-1">
                    <p className="code-head">CODE DASH</p>
                    <p className="secondary-head">
                      Run, jump, answer coding questions to survive. Measure
                      your high score against your peers
                    </p>
                  </div>
                  <div className="primary-head-2">
                    <img
                      src={DashRunner}
                      className="runner-img"
                      alt="runner-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-container body">
            <div className="codedash-body">
              <div className="codedash-game-container">
                {this.state.showGame ? (
                  <React.Fragment>
                    <div className="game">
                      <Canvas />
                      <div id={this.state.sceneKey}>
                        {this.switchScene(this.state.sceneKey)}
                      </div>
                    </div>
                    <div className="leaderboard">
                      <LeaderBoard />
                    </div>
                  </React.Fragment>
                ) : (
                  <p>Screen size not good enough to play </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
