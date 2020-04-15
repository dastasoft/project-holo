import React, { useEffect, useContext } from 'react';

import { GlobalContext } from '../../context/globalContext';
import Header from '../../components/Header';
import CallRoom from '../../components/CallRoom';
import './Layout.scss';

const Layout = ({ history }) => {
  const { setRoomName } = useContext(GlobalContext);
  const validateUrl = history.location.pathname.match('/(.*)');
  if (validateUrl) setRoomName(validateUrl[1]);

  return (
    <div className="call-layout">
      <Header className="header" />
      <CallRoom className="call-room" history={history} />
    </div>
  );
};

export default Layout;
