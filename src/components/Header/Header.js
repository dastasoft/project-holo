import React from 'react';
import styled from 'styled-components';

import logo_signo from './logo_signo.gif';
import logos from './logos.gif';

const Header = ({ className }) => {
  return (
    <Wrapper className={className}>
      <img src={logo_signo} alt="Logo Signo" />
      <img src={logos} alt="Logos" />
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
