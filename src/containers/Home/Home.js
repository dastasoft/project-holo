import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/ReactJedisUI/RJInput';
import Button from '../../components/ReactJedisUI/RJButton';
import logo from '../../assets/GrowMeeting.png';

const Home = ({ onRoomName }) => {
  const [roomName, setRoomName] = useState('');

  const inputChangeHandler = ev => setRoomName(ev.target.value);

  return (
    <HomeLayout>
      <img src={logo} alt="Logo GrowMeeting" />
      <Input
        type="text"
        placeholder="Join or Create Room"
        value={roomName}
        onChange={inputChangeHandler}
      />
      <Button onClick={() => onRoomName(roomName)}>SEND</Button>
    </HomeLayout>
  );
};

const HomeLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    text-align: center;
    font-size: 25px;
  }
`;

export default Home;
