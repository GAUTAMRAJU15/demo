import React from 'react';
import Game from '../../../invader';
import QuestionModal from '../../modal/questionModal';
import OverModal from '../../modal/overmodal';
import PurchaseModal from '../../modal/purchase';
import InitModal from '../../modal/initModal';
import './canvas.scss';

class Canvas extends React.Component {
  componentDidMount() {
    this.game = new Game();
    this.game.createGame();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.game.destroyGame();
  }

  render() {
    return (
      <div id="game">
        <QuestionModal />
        <PurchaseModal />
        <OverModal />
        <InitModal />
      </div>
    );
  }
}

export default Canvas;
