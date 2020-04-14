import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Layout from '../containers/Layout';

const Routes = () => (
  <>
    <Switch>
      <Route path="/call/:roomName" component={Layout} />
      <Route path="/" exact component={Home} />
    </Switch>
  </>
);

export default Routes;
