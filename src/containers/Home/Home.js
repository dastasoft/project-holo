import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import Input from '../../components/ReactJedisUI/RJInput';
import Button from '../../components/ReactJedisUI/RJButton';
import logo from '../../assets/GrowMeeting.png';
import { generateName } from '../../utils/randomName';
import { GlobalContext } from '../../context/globalContext';

const Home = ({ history }) => {
  const [inputText, setInputText] = useState('');
  const { setRoomName } = useContext(GlobalContext);

  const inputChangeHandler = ev => setInputText(ev.target.value);

  const onSubmitHandler = ev => {
    ev.preventDefault();
    if (inputText.length > 0) {
      const roomName = `${inputText}-${generateName()}`;
      setRoomName(roomName);
      history.push(`/${roomName}`);
    }
  };

  return (
    <HomeLayout>
      <img src={logo} alt="Logo GrowMeeting" />
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          placeholder="Join or Create Room"
          value={inputText}
          onChange={inputChangeHandler}
          autoFocus
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
