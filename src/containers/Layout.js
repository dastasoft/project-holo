/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';

import { GlobalContext } from '../context/globalContext';
import Header from '../components/Header';
import CallRoom from '../components/CallRoom';
import SizedConfetti from '../components/SizedConfetti';
import Firework from '../components/Firework';

const OVERLAY = Object.freeze({
  open: 'w-screen h-screen',
  close: 'w-0, h-0'
});

const Layout = ({ history }) => {
  const [isOverlayActive, setOverlayActive] = useState(false);
  const { setRoomName, party, setParty, fireworks, setFireworks } = useContext(
    GlobalContext
  );
  const validateUrl = history.location.pathname.match('/(.*)');
  if (validateUrl) setRoomName(validateUrl[1]);

  return (
    <div className="w-screen h-screen max-h-full max-w-full flex flex-col">
      <div
        className={`${
          isOverlayActive ? OVERLAY.open : OVERLAY.close
        } absolute z-50 bg-black opacity-50`}
      />
      <Header />
      <CallRoom history={history} setOverlayActive={setOverlayActive} />
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
