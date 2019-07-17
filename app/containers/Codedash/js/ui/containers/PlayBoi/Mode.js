/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { startGame } from '../../../loginin/firebase';

class Mode extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'true',
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.enterFullScreen);
    startGame(this.props.initialiseGame, this.props.counter);
  }


  render() {
    return null;
  }
}

export default Mode;
