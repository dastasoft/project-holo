import React, { useState } from 'react';
import { render } from 'react-dom';

import Routes from './routes/routes';
import { GlobalContext } from './context/globalContext';
import useActionSocket from './hook/useActionSocket';
import useSamplers from './hook/useSamplers';

import './styles/app.css';

const App = () => {
  const [roomName, setRoomName] = useState(null);
  const [roomPassword, setRoomPassword] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [party, setParty] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const { playSample } = useSamplers();
  const { socket, broadcastRoomJoin } = useActionSocket({
    confetti: () => setParty(true),
    fireworks: () => setFireworks(true),
    playSample: sample => playSample(sample)
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
          fireworks,
          setFireworks,
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
