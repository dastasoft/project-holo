import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import Input from '../../components/ReactJedisUI/RJInput';
import Button from '../../components/ReactJedisUI/RJButton';
import logo from '../../assets/GrowMeeting.png';
import { generateName } from '../../utils/randomName';
import { GlobalContext } from '../../context/globalContext';

const Home = ({ history }) => {
  const [userRoomName, setUserRoomName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { setRoomName, setRoomPassword } = useContext(GlobalContext);

  const onUserRoomNameHandler = ev => setUserRoomName(ev.target.value);
  const onPasswordHandler = ev => setUserPassword(ev.target.value);

  const onCreateHandler = ev => {
    ev.preventDefault();
    if (userRoomName.length > 0) {
      const roomName = `${userRoomName}-${generateName()}`;
      setRoomName(roomName);
      setRoomPassword(userPassword);
      history.push(`/${roomName}`);
    }
  };

  const onJoinHandler = ev => {
    ev.preventDefault();
    if (userRoomName.length > 0) {
      const roomName = `${userRoomName}`;
      setRoomName(roomName);
      setRoomPassword(userPassword);
      history.push(`/${roomName}`);
    }
  };

  return (
    <HomeLayout>
      <img src={logo} alt="Logo GrowMeeting" />
      <Input
        type="text"
        placeholder="Room Name"
        value={userRoomName}
        onChange={onUserRoomNameHandler}
      />
      <Input
        type="password"
        placeholder="Password (Optional)"
        value={userPassword}
        onChange={onPasswordHandler}
      />
      <Actions>
        <Button onClick={onCreateHandler}>CREATE NEW ROOM</Button>
        <Button onClick={onJoinHandler}>JOIN EXISTENT ROOM</Button>
      </Actions>
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

const Actions = styled.div`
  display: flex;

  > *:first-of-type {
    margin-right: 21px;
  }
`;

export default Home;
