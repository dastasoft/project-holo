import React, { useState } from 'react';
import { render } from 'react-dom';

import Routes from './routes/routes';
import { GlobalContext } from './context/globalContext';
import './index.scss';

const App = () => {
  const [roomName, setRoomName] = useState(null);
  const [roomPassword, setRoomPassword] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [party, setParty] = useState(false);

  return (
    <>
      <GlobalContext.Provider
        value={{
          roomName,
          setRoomName,
          participantCount,
          setParticipantCount,
          roomPassword,
          setRoomPassword,
          party,
          setParty
        }}
      >
        <Routes />
      </GlobalContext.Provider>
    </>
  );
};

render(<App />, document.getElementById('root'));
