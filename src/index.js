import React, { useState } from 'react';
import { render } from 'react-dom';

import Layout from './containers/Layout';
import Home from './containers/Home';
import { GlobalContext } from './context/globalContext';
import './index.scss';

const App = () => {
  const [roomName, setRoomName] = useState(
    window.location.pathname.replace('/', '')
  );
  const [participantCount, setParticipantCount] = useState(0);

  return (
    <>
      <GlobalContext.Provider
        value={{ roomName, setRoomName, participantCount, setParticipantCount }}
      >
        {roomName ? <Layout /> : <Home />}
      </GlobalContext.Provider>
    </>
  );
};

render(<App />, document.getElementById('root'));
