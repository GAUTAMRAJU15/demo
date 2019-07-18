import React from 'react';
import { submit, unlockHint } from '../../questionModal/data';
import coinImg from '../../../assets/images/coin.png';
import hintImg from '../../../assets/images/hint.svg';
import './style.scss';

class Question extends React.Component {

  render() {
    return (
      <div className="myModal">
        <div className="modal-dialog  hideModal" role="document">
          <div className="modal-info-life">
            {' '}
            <div className="life-text" />
          </div>
          <div className="modal-info">Please answer the question</div>
          <div className="modal-header">
            <div>
              <h5 className="modal-title">
                <img src={coinImg} width="30" height="30" />
                <span>
                  <span className="coin-value">20</span> COINS for right answer!
                </span>
              </h5>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <h5 className="modal-title-1" id="timer" />
            </div>
          </div>
          <div className="modal-body">
            <div className="questionTitle"> </div>
            <div className="question" />
          </div>
          <div className="modal-option" />
          <div className="modal-hint hide-hint">
            <img src={hintImg} width="40" height="40" />
            <div className="hint-wrapper">
              <span className="hint-pre-text">Hint Unlocked</span>
              <span className="hint-text" />
            </div>
          </div>
          <div className="modal-alert hide-alert">
            You have less than 10 coins, you can't unlock hints
          </div>
          <div className="modal-footer">
            <button
              onClick={() => submit()}
              className="submit-btn"
              type="button"
            >
              Submit Answer
            </button>
            <button
              onClick={() => unlockHint()}
              className="unlock-btn"
              type="button"
            >
              Unlock Hint for&nbsp;
              <span className="imgContent">
                10&nbsp;
                <img src={coinImg} width="20" height="20" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Question;
