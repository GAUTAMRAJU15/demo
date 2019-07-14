import React from 'react';
import Game from '../../../invader';
import QuestionModal from '../../modal/questionModal';
import OverModal from '../../modal/overmodal';
import PurchaseModal from '../../modal/purchase';
import './canvas.scss';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    // this.game = Game.createGame();
  }

  componentDidMount() {
    console.log('canvas mounted');
    this.game = Game.createGame();
    console.log(this.game);
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
          <QuestionModal />
          <PurchaseModal />
          <OverModal />
        </div>
      </>
    );
  }
}

export default Canvas;
