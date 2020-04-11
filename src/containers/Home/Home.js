import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/ReactJedisUI/RJInput';
import Button from '../../components/ReactJedisUI/RJButton';
import logo from '../../assets/GrowMeeting.png';

const Home = ({ onRoomName }) => {
  const [roomName, setRoomName] = useState('');

  const inputChangeHandler = ev => setRoomName(ev.target.value);

  const onSubmitHandler = ev => {
    ev.preventDefault();
    if (roomName.length > 0) {
      onRoomName(roomName);
    }
  };

  return (
    <HomeLayout>
      <img src={logo} alt="Logo GrowMeeting" />
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          placeholder="Join or Create Room"
          value={roomName}
          onChange={inputChangeHandler}
        />
        <Button>SEND</Button>
      </form>
    </HomeLayout>
  );
};

const HomeLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: inherit;
    flex-direction: inherit;
    justify-content: inherit;
    align-items: inherit;
  }

  input {
    text-align: center;
    font-size: 25px;
  }
`;

export default Home;
