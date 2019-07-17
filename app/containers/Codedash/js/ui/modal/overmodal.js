import React from 'react';
import overImg from '../../../assets/images/over.png';
import coinImg from '../../../assets/images/coin.png';
import './over.scss';

class OverModal extends React.Component {
  componentDidMount() {
    console.log('game over scene init');
  }

  render() {
    return (
      <div className="gameover-modal">
        <div className="gameover-body">
          <img className="gameover_svg" src={overImg} />
          <div className="session-text">Session summary</div>
          <div className="gameover-info">
            <div className="time-info">
              <div className="survival-text"> Your survival time:</div>
              <h2 className="timer-text"> </h2>
            </div>
            <div className="separator" />
            <div className="coin-info">
              <div className="coin_inc">Coins Earned:</div>
              <div className="gameover-coinearntext">
                <img src={coinImg} width="60" height="60" />
                <div className="coins-session" />
              </div>
            </div>
          </div>
          <div className="coins-earned">
            <div className="coins-earned-info">
              Total Coins:
              <img src={coinImg} width="30" height="30" />
              <span className="gameover-cointext"> </span>
            </div>
          </div>
        </div>
        <button className="gameover-btn">Play Again</button>
      </div>
    );
  }
}

export default OverModal;
