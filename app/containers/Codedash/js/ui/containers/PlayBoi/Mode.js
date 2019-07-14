import React from 'react';
import firebase from 'firebase/app';
import { startGame, selectMode } from '../../../firebase/firebase';
import logo from '../../../../assets/images/logo.png';

// import {screenAdjust,setGameScreenState} from "../../../invader";
import 'firebase/database';
import './mode.scss';

let stuRef = null;

class Mode extends React.Component {
  constructor() {
    super();
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyCW0wlcUs2uUsJ4_00sDlnP2eI9p_pN5EY',
        authDomain: 'jumper123-68e9a.firebaseapp.com',
        databaseURL: 'https://jumper123-68e9a.firebaseio.com',
        projectId: 'jumper123-68e9a',
      };
      firebase.initializeApp(config);
      stuRef = firebase.database().ref();
    }
    this.state = {
      value: 'true',
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.enterFullScreen);
    startGame(stuRef, this.props.initialiseGame);
  }

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
          <div className="gamestart-btn">Press 'Space bar' to start</div>
        </div>
      </div>
    );
  }
}

export { stuRef };
export default Mode;
