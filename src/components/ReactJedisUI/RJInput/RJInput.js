import styled from 'styled-components';
import RJInputBase from './RJInputBase';

const RJIntput = styled(RJInputBase)`
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #cacaca;
  height: 2em;
  padding: 10px;

  &:focus {
    outline: none;
    &::placeholder {
      color: transparent;
    }
  }
`;

export default RJIntput;
