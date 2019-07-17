import React from 'react';
import firebase from 'firebase/app';
import { startGame, selectMode } from '../../../firebase/firebase';

// import {screenAdjust,setGameScreenState} from "../../../invader";
import 'firebase/database';
// import './mode.scss';

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
    return null;
  }
}

export { stuRef };
export default Mode;
