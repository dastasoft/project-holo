import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from '../containers/Home';
import Layout from '../containers/Layout';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:roomName" component={Layout} />
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
