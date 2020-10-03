/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';

import Input from '../components/ReactJedisUI/RJInput';
import Button from '../components/ReactJedisUI/RJButton';
import logo from '../assets/GrowMeeting.png';
import { GlobalContext } from '../context/globalContext';

const Home = ({ history }) => {
  const [userRoomName, setUserRoomName] = useState('');
  const [userPassword] = useState('');
  const { setRoomName, setRoomPassword } = useContext(GlobalContext);

  const onUserRoomNameHandler = ev => setUserRoomName(ev.target.value);

  const onCreateHandler = ev => {
    ev.preventDefault();
    if (userRoomName.length > 0) {
      const roomName = userRoomName;
      setRoomName(roomName);
      setRoomPassword(userPassword);
      history.push(`/${roomName}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={logo} alt="Logo GrowMeeting" />
      <form className="flex flex-col items-center" onSubmit={onCreateHandler}>
        <Input
          className="text-center text-xl"
          type="text"
          placeholder="Room Name"
          value={userRoomName}
          onChange={onUserRoomNameHandler}
        />
        <Button onClick={onCreateHandler}>ENTER ROOM</Button>
      </form>
    </div>
  );
};

export default Home;
