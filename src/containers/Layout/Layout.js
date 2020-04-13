import React from 'react';

import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="call-layout">
      <Header className="header" />
      <CallRoom className="call-room" />
    </div>
  );
};

export default Layout;
