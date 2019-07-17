import React from 'react';
import Game from '../../../invader';
import QuestionModal from '../../modal/questionModal';
import OverModal from '../../modal/overmodal';
import PurchaseModal from '../../modal/purchase';
import InitModal from "../../modal/initModal";
import './canvas.scss';

class Canvas extends React.Component {
  componentDidMount() {
    this.game = Game.createGame();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    Game.destroyGame(this.game);
  }

  render() {
    return (
      <>
        <div id="game">
          <InitModal />
          <QuestionModal />
          <PurchaseModal />
          <OverModal />
        </div>
      </>
    );
  }
}

export default Canvas;
