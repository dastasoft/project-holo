import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/GrowMeeting.png';

const Header = ({ className, roomName }) => {
  return (
    <Wrapper className={className}>
      <img src={logo} alt="Logo GrowMeeting" height="75px" />
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

export default Header;
