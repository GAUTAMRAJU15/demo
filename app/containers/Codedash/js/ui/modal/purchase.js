import React from 'react';
import { dontEndGame, endGame } from '../../questionModal/data';
import coinImg from '../../../assets/images/coin.png';
import './purchase.scss';

class Purchase extends React.Component {
  render() {
    return (
      <div className="myPurchaseModal">
        <div className="purchase hide-purchase">
          <div className="purchase-message">
            {' '}
            <div>You're Out of Lives!!</div>
          </div>
          <div className="purchase-body">
            <div className="current-coin">
              <div className="text">You currently have</div>
              <img src={coinImg} width="22" height="22" />
              <div className="coin_value" />
            </div>
            <button type="button" id="purchase_me" className="purchase-btn" onClick={() => dontEndGame()}>
              <div className="btn-1">Buy and extra life for </div>
              <img src={coinImg} width="20" height="20" />
              <div className="to_buy">100</div>
            </button>
            <button className="endgame" onClick={() => endGame()}>
              <div>End game</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Purchase;
