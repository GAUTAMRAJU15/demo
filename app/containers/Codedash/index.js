import React from 'react';
import Loadable from 'react-loadable';



const LoadableWallet = Loadable.Map({
  loader: {
    js: () => {
         const script = document.createElement('script');
    script.src = '';
    script.addEventListener('load', () => {
        console.log('render script loaded');
      const head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
      return;
    }) 
}, 
    CodeDash: () => import("./js/ui/App"),
  },
  render(loaded, props) {
   
    const Game = loaded.CodeDash.default;
    // const js = loaded.js;
    return <Game />
    // const script = document.createElement('script');
    // script.src = js;
    // script.addEventListener('load', () => {
    //   const head = document.getElementsByTagName('head')[0];
    //   head.appendChild(script);
    //   return <Game {...props} />;
    // });
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Loader = () => <LoadableWallet />;

export default Loader;
