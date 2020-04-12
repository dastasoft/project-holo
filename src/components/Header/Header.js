import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/GrowMeeting.png';

const Header = ({ className, roomName, participantCount }) => {
  return (
    <Wrapper className={className}>
      <img src={logo} alt="Logo GrowMeeting" height="75px" />
      <div>
        <i className="fas fa-users" />
        <ParticipantCount>{participantCount}</ParticipantCount>
      </div>
      <span>{roomName}</span>
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

export default Header;
