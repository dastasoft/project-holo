import styled from 'styled-components';
import RJButtonBase from './RJButtonBase';

const RJButton = styled(RJButtonBase)`
  margin-top: 1em;
  padding: 10px 30px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: #4eb8c1;
  border: 0;
  &:hover {
    box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.25);
  }
  &:focus {
    outline: none;
  }
`;

export default RJButton;
