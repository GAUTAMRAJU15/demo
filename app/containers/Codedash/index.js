import React from 'react';
import CodeDashLodable from './loadable';
import { id } from './js/questionModal/data';

class CodeDash extends React.Component {
  componentWillMount() {
    if (!window.Phaser) {
      this.loadPhaser()
        .then(() => {
          this.setState({
            phaserLoaded: true,
          });
        })
        .catch(err => {
          this.setState({
            phaserLoaded: true,
          });
        });
    }

    clearInterval(id);
  }

  loadPhaser = async () => {
    //    check if its already there don't add the script
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.16.1/phaser.min.js';
    document.head.appendChild(script);
    return new Promise((resolve, reject) => {
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', () => {
        reject();
      });
    });
  };

  state = {
    phaserLoaded: window.Phaser ? true : false,
  };

  render() {
    console.log('phaser loaded', this.state.phaserLoaded, window.Phaser);
    return (
      <React.Fragment>
        {this.state.phaserLoaded && <CodeDashLodable />}
      </React.Fragment>
    );
  }
}

export default CodeDash;
