import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import img from '../../assets/images/sky1.png';
import timerImg from '../../assets/images/timer.png';
import UserModel from './userModel';

import './leaderboard.scss';

class LeaderBoard extends Component {
  state = {
    updated: false,
  };

  userData = [
    {
      rank: 1,
      totalSecondsUsed: 123,
      coins: 120,
      picture: img,
      name: 'Raju Gautam',
    },
  ];

  userData_1 = [];

  componentDidMount() {
    this.userData_1 = this.userData
      .sort(function(a, b) {
        return a.totalSecondsUsed - b.totalSecondsUsed || b.coins - a.coins;
      })
      .reverse();
    this.setState({ updated: true });
  }

  timeFormatter = time => {
    let secondsFetch = time % 60;
    let minutesFetch = Math.floor(time / 60);
    secondsFetch =
      String(secondsFetch).length < 2 ? '0' + secondsFetch : secondsFetch;
    minutesFetch =
      String(minutesFetch).length < 2 ? '0' + minutesFetch : minutesFetch;

    return `${minutesFetch}m ${secondsFetch}s`;
  };

  render() {
    return (
      <div className="codedashleaderboard">
        <div className="leaderboard-title">Top 5 performers</div>
        <Grid className="leaderboard-data">
          {this.userData_1.map((user, i) => (
            <Grid.Row key={i} className="list_user">
              <Grid.Column
                mobile={2}
                tablet={2}
                computer={2}
                className="rank-index-ql"
              >
                <div>
                  <p>{user.rank}</p>
                </div>
              </Grid.Column>
              <Grid.Column
                mobile={11}
                tablet={11}
                computer={8}
                className="leaderboard-name-ql"
              >
                <img
                  src={user.picture}
                  width="30"
                  height="30"
                  className="img_user"
                  alt="img"
                />
                {user.name}
              </Grid.Column>
              <Grid.Column
                mobile={3}
                tablet={3}
                computer={6}
                only="table computer"
                className="timer-ql"
              >
                <img src={timerImg}  alt="img" />
                {this.timeFormatter(user.totalSecondsUsed)}
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

export default LeaderBoard;
