/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/GrowMeeting.png';
import { GlobalContext } from '../context/globalContext';

const Header = () => {
  const { roomName, participantCount } = useContext(GlobalContext);

  const onClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="h-16 flex justify-between items-center mx-4">
      <Link className="h-full" to="/">
        <img
          style={{ height: 'inherit' }}
          src={logo}
          alt="Logo GrowMeeting"
          height="75px"
        />
      </Link>
      <div className="flex items-center">
        <i className="far fa-user" />
        <span className="ml-1">{participantCount}</span>
      </div>
      <div className="flex items-center">
        <span className="text-black">{roomName}</span>
        <i
          className="far fa-copy cursor-pointer ml-2"
          onClick={onClipboardHandler}
          role="button"
        />
      </div>
    </div>
  );
};

export default Header;
