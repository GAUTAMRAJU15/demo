import React from 'react';
import logo from '../../../assets/images/logo.png';
import './initModal.scss';
import { selectMode } from '../../loginin/firebase';

class InitModal extends React.Component {
  state = {
    value: 'true',
  };


  selectOption = e => {
    this.setState({ value: e.target.value });
    selectMode(e.target.value);
  };


  render() {
    return (
      <div className="gamestart-modal">
        <div className="gamestart-body">
          <img className="logo_img" src={logo} width="600" height="250" />
          <div className="lang-text"> Choose your programming language</div>
          <select
            className="select_mode_1"
            value={this.state.value}
            onChange={this.selectOption}
          >
            <option value="true" disabled="disabled">
              Choose a language
            </option>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML5</option>
            <option value="css">CSS</option>
          </select>
          <div className="gamestart-full">Press 'SHIFT' for FullScreen</div>
          <div className="gamestart-btn">Press 'Space bar' to start</div>

        </div>
      </div>
    );
  }
}

export default InitModal;
