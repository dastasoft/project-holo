/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { GlobalContext } from '../context/globalContext';
import Header from '../components/Header';
import CallRoom from '../components/CallRoom';
import SizedConfetti from '../components/SizedConfetti';
import Firework from '../components/Firework';

const Layout = ({ history }) => {
  const { setRoomName, party, setParty, fireworks, setFireworks } = useContext(
    GlobalContext
  );
  const validateUrl = history.location.pathname.match('/(.*)');
  if (validateUrl) setRoomName(validateUrl[1]);

  return (
    <div className="w-screen h-screen max-h-full max-w-full flex flex-col">
      <Header />
      <CallRoom history={history} />
      <SizedConfetti
        isParty={party}
        recycle={false}
        onConfettiComplete={confetti => {
          setParty(false);
          confetti.reset();
        }}
      />
      <Firework
        isActive={fireworks}
        onComplete={() => setFireworks(false)}
        time={6000}
      />
    </div>
  );
};

export default Layout;
