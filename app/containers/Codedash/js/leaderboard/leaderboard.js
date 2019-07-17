import React, { Component } from 'react';
import './leaderboard.scss';

class LeaderBoard extends Component {
  state = {};

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <div className="codedashleaderboard">
        <p className="leaderboard-title">HIGH SCORES</p>
      </div>
    );
  }
}

export default LeaderBoard;
