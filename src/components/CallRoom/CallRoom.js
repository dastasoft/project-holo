/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';

const chatRoomConfig = {
  width: 1280,
  height: 720,
  border: 5,
  roomName: 'Test Room Name'
};

const CallRoom = () => {
  const {
    isVideoEnabled,
    isAudioEnabled,
    isChatEnabled,
    startRoom,
    roomNameChange,
    toggleAudio,
    toggleVideo,
    toggleChat,
    toggleShareScreen,
    toggleTileView,
    hangup
  } = useConference({
    roomDOM: '#chatRoom',
    roomName: chatRoomConfig.roomName,
    width: chatRoomConfig.width,
    height: chatRoomConfig.height
  });
  const [roomName, setRoomName] = useState(chatRoomConfig.roomName);

  useEffect(() => {
    startRoom();
  }, []);

  const onRoomNameHandler = event => {
    setRoomName(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'stretch', padding: '8px' }}>
        <input
          style={{ marginRight: '8px' }}
          type="text"
          value={roomName}
          onChange={onRoomNameHandler}
        />
        <Button type="button" onClick={() => roomNameChange(roomName)}>
          <i className="fa fa-edit" />
        </Button>
      </div>
      <ChatRoom id="chatRoom" {...chatRoomConfig} />
      <Buttons>
        <Button type="button" onClick={toggleShareScreen}>
          <i className="fa fa-tv" />
        </Button>
        <Button type="button" onClick={toggleChat}>
          <i className={`fa fa-comment${isChatEnabled ? '' : '-slash'}`} />
        </Button>
        <Button type="button" onClick={toggleAudio}>
          <i className={`fa fa-microphone${isAudioEnabled ? '' : '-slash'}`} />
        </Button>
        <Button type="button" onClick={toggleVideo}>
          <i className={`fa fa-video${isVideoEnabled ? '' : '-slash'}`} />
        </Button>
        <Button type="button" onClick={hangup}>
          <i className="fa fa-door-open" />
        </Button>
      </Buttons>
    </div>
  );
};

const ChatRoom = styled.div`
  width: ${props => props.width + props.border * 2}px;
  height: ${props => props.height + props.border * 2}px;
  margin: 0 auto;
  border: ${props => props.border}px solid RoyalBlue;
  border-radius: ${props => props.border}px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 5px 8px;
  }

  > *:first-of-type {
    margin-left: 0;
  }

  > *:last-of-type {
    margin-right: 0;
  }
`;

const Button = styled.button`
  background-color: teal;
  border: none;
  color: white;
  padding: 13px 18px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20%;

  &:hover {
    background-color: RoyalBlue;
  }
`;

export default CallRoom;
