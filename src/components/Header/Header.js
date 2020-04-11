import React from 'react';
import styled from 'styled-components';

import logo_signo from '../../assets/GrowMeeting.png';

const Header = ({ className }) => {
  return (
    <Wrapper className={className}>
      <img src={logo_signo} alt="Logo GrowMeeting" height="75px" />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  margin: 0 1em;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
