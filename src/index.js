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

  const useActionSocket = roomName => {
    const ENDPOINT = 'http://grow-meeting-websocket.herokuapp.com';

    const [socket, setSocket] = useState(null);

    useEffect(() => {
      setSocket(socketIOClient(ENDPOINT));
    }, []);

    useEffect(() => {
      console.log('App -> socket', socket);
      if (socket && roomName) {
        socket.on('action', data => {
          if (data.action == 'confetti') {
            console.log('[confetti]');
            setParty(true);
          } else if (data.action == 'sound') {
            console.log('[sound]');
            sound.play();
          }
        });
        socket.on('connect', function() {
          socket.emit('join', roomName);
        });
      }
    }, [socket, roomName]);

    return socket;
  };

  const socket = useActionSocket(roomName);

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
          socket
        }}
      >
        <Routes />
      </GlobalContext.Provider>
    </>
  );
};

render(<App />, document.getElementById('root'));
