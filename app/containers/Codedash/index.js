import React from 'react';
import CodeDashLodable from './lodable';

class CodeDash extends React.Component {
  componentWillMount() {
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
    phaserLoaded: false,
  };

  render() {
    console.log('code dash render: ', this.state);
    return <>{this.state.phaserLoaded && <CodeDashLodable />}</>;
  }
}

export default CodeDash;
