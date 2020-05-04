import React, { useState } from 'react';
import { render } from 'react-dom';

import Routes from './routes/routes';
import { GlobalContext } from './context/globalContext';
import useActionSocket from './hook/useActionSocket';
import './index.scss';

const App = () => {
  const [roomName, setRoomName] = useState(null);
  const [roomPassword, setRoomPassword] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [party, setParty] = useState(false);

  const { socket, broadcastRoomJoin } = useActionSocket({
    confetti: () => setParty(true)
  });

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
          setParty,
          socket,
          broadcastRoomJoin
        }}
      >
        <Routes />
      </GlobalContext.Provider>
    </>
  );
};

render(<App />, document.getElementById('root'));
