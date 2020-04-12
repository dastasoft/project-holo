import React, { useState } from 'react';

import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';

import './Layout.scss';

const Layout = ({ roomName }) => {
  const [participantCount, setParticipantCount] = useState(0);

  return (
    <div className="call-layout">
      <Header
        className="header"
        roomName={roomName}
        participantCount={participantCount}
      />
      <CallRoom
        className="call-room"
        roomName={roomName}
        onParticipantCount={setParticipantCount}
      />
    </div>
  );
};

export default Layout;
