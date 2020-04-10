import React from 'react';
import { render } from 'react-dom';

import Layout from './containers/Layout';
import './index.scss';

const App = () => (
  <div>
    <Layout />
  </div>
);

render(<App />, document.getElementById('root'));
