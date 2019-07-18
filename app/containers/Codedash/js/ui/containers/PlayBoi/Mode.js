/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { startGame } from '../../../loginin/firebase';
import { game } from '../../../invader';

class Mode extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      value: 'true',
    };
  }

  componentDidMount() {
    // console.log(game.scene._start, '///////////////////////////');
    // console.log(game.scene._start, '///////////////////////////');



   if(!this._isMounted) {
    window.addEventListener('keypress', this.enterFullScreen)
    console.log("mode mounted ....");
    startGame(this.props.initialiseGame, this.props.counter);
    this._isMounted =  true;
   }
  }

  componentWillUnmount() {
    console.log("unmount mode container")
  }


  render() {
    return null;
  }
}

export default Mode;
