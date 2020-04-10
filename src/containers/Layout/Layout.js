import React from 'react';

import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';
import NotarioThing from '../../components/NotarioThing';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="call-layout">
      <Header className="header" />
      <CallRoom className="call-room" />
      <NotarioThing className="notario-thing" />
    </div>
  );
};

export default Layout;
