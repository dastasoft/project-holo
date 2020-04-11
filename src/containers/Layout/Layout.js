import React from 'react';

import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';

import './Layout.scss';

const Layout = ({ roomName }) => {
  return (
    <div className="call-layout">
      <Header className="header" roomName={roomName} />
      <CallRoom className="call-room" roomName={roomName} />
    </div>
  );
};

export default Layout;
