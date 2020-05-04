import React, { useContext } from 'react';

import { GlobalContext } from '../../context/globalContext';
import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';
import SizedConfetti from '../../components/SizedConfetti';
import './Layout.scss';

const Layout = ({ history }) => {
  const { setRoomName, party, setParty } = useContext(GlobalContext);
  const validateUrl = history.location.pathname.match('/(.*)');
  if (validateUrl) setRoomName(validateUrl[1]);

  return (
    <div className="call-layout">
      <Header className="header" />
      <CallRoom className="call-room" history={history} />
      <SizedConfetti
        isParty={party}
        recycle={false}
        onConfettiComplete={confetti => {
          setParty(false);
          confetti.reset();
        }}
      />
    </div>
  );
};

export default Layout;
