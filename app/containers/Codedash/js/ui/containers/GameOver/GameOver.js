import React from 'react';

class GameOver extends React.Component {
  componentDidMount() {
    console.log('game over scene init');
  }

  componentWillUnmount() {
    console.log("gane over unmounted")
  }
  render() {
    return null;
  }
}

export default GameOver;
