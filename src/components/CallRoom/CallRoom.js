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

const CallRoom = ({ className }) => {
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
    <div className={className}>
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
  margin: 0 auto;
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
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20%;

  &.active {
    transition: background-color red;
  }
`;

export default CallRoom;
