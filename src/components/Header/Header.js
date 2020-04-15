import React, { useContext } from 'react';
import styled from 'styled-components';

import logo from '../../assets/GrowMeeting.png';
import { GlobalContext } from '../../context/globalContext';

const Header = ({ className }) => {
  const { roomName, participantCount } = useContext(GlobalContext);

  const onClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Wrapper className={className}>
      <img src={logo} alt="Logo GrowMeeting" height="75px" />
      <div>
        <i className="far fa-user" />
        <ParticipantCount>{participantCount}</ParticipantCount>
      </div>
      <Room>
        <span>{roomName}</span>
        <i className="far fa-copy" onClick={onClipboardHandler} role="button" />
      </Room>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  margin: 0 1em;
  justify-content: space-between;
  align-items: center;
  span {
    color: #4f5f6e;
    font-size: bold;
  }
`;

const ParticipantCount = styled.span`
  margin-left: 8px;
`;

const Room = styled.div`
  display: flex;
  align-items: center;

  > *:first-of-type {
    margin-right: 8px;
  }

  i {
    cursor: pointer;
  }
`;

export default Header;
