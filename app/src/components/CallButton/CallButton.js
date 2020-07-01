import styled from 'styled-components';

import CallButtonBase from './CallButonBase';

const CallButton = styled(CallButtonBase)`
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: ${({ isCustom }) => (isCustom ? '' : '24px')};
  cursor: pointer;
  border-radius: 24px;

  &:hover {
    background-color: white;
    color: grey;
  }

  &.exit {
    color: red;
    font-size: 26px;
  }

  &.exit:hover {
    background-color: white;
  }

  &.active {
    color: orange;
  }

  &.active:hover {
    background-color: white;
  }
`;

export default CallButton;
