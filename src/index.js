import React, { useState } from 'react';
import { render } from 'react-dom';

import Layout from './containers/Layout';
import Home from './containers/Home';
import './index.scss';

const App = () => {
  const [roomName, setRoomName] = useState(null);

  return (
    <div>
      {roomName ? (
        <Layout roomName={roomName} />
      ) : (
        <Home onRoomName={setRoomName} />
      )}
    </div>
  );
};

render(<App />, document.getElementById('root'));
