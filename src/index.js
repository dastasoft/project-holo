import React, { useState, useEffect } from 'react';
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
  const [participantId, setParticipantId] = useState('');
  const [launchBuzz, setLaunchBuzz] = useState('');
  const [party, setParty] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const { playSample } = useSamplers();

  const launchBuzzNotification = theParticipantId => {
    if (participantId !== theParticipantId) {
      if ('Notification' in window) {
        const ask = Notification.requestPermission();
        ask.then(permission => {
          if (permission === 'granted') {
            const msg = new Notification('Incoming notification!', {
              body: 'Your attention is required in GrowMeeting.',
              icon:
                'https://cdn.discordapp.com/attachments/727479740050571294/727480000978223165/GrowMeetingLogo.png'
            });
            msg.addEventListener('click', () => {});
          }
        });
      }
    }
  };

  useEffect(() => {
    if (launchBuzz) {
      launchBuzzNotification(launchBuzz);
      setTimeout(setLaunchBuzz(''), 2000);
    }
  }, [launchBuzz]);

  const { socket, broadcastRoomJoin } = useActionSocket({
    confetti: () => setParty(true),
    fireworks: () => setFireworks(true),
    buzz: theParticipantId => setLaunchBuzz(theParticipantId),
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
          setParticipantId,
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
