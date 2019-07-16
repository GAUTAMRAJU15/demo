import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./js/ui/App'),
  loading() {
    return <div>Loading...</div>;
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export default class CodeDashLazyLoad extends React.Component {
  render() {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <LoadableComponent />;
  }
}
