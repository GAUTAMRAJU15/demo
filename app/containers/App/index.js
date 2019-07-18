/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter} from 'react-router-dom';

// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import Codedash from 'containers/Codedash';
import GlobalStyle from '../../global-styles';


function App(props) {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s - code dash"
        defaultTitle="codedash"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            // eslint-disable-next-line react/button-has-type
            <button type="button" onClick={() => props.history.push('/codedash')}>
              Click me
            </button>
          )}
        />
        <Route exact path="/codedash" component={Codedash} />
      </Switch>

      <GlobalStyle />
    </React.Fragment>
  );
}

export default withRouter(App);