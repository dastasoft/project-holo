import React, { useState } from 'react';
import { render } from 'react-dom';

import Routes from './routes/routes';
import { GlobalContext } from './context/globalContext';
import './index.scss';

const App = () => {
  const [roomName, setRoomName] = useState(null);
  const [participantCount, setParticipantCount] = useState(0);

  return (
    <>
      <GlobalContext.Provider
        value={{ roomName, setRoomName, participantCount, setParticipantCount }}
      >
        <Routes />
      </GlobalContext.Provider>
    </>
  );
};

render(<App />, document.getElementById('root'));
