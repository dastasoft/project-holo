/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';

const CallRoom = ({ className }) => {
  const {
    isVideoEnabled,
    isAudioEnabled,
    isChatEnabled,
    startRoom,
    toggleAudio,
    toggleVideo,
    toggleChat,
    toggleShareScreen,
    hangup
  } = useConference({
    roomDOM: '#chatRoom',
    roomName: 'cris-test'
  });
  useEffect(() => {
    startRoom();
  }, []);

  return (
    <ChatRoom className={className}>
      <div className="chat-visor" id="chatRoom" />
      <div className="chat-buttons">
        <Button type="button" onClick={toggleShareScreen}>
          <i className="fa fa-tv" />
        </Button>
        <Button type="button" onClick={toggleAudio}>
          <i className={`fa fa-microphone${isAudioEnabled ? '' : '-slash'}`} />
        </Button>
        <Button type="button" onClick={toggleVideo}>
          <i className={`fa fa-video${isVideoEnabled ? '' : '-slash'}`} />
        </Button>
        <Button type="button" className="exit" onClick={hangup}>
          <i className="fa fa-sign-out-alt" />
        </Button>
      </div>
    </ChatRoom>
  );
};

const ChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  .chat-visor {
    flex-grow: 1;
  }

  .chat-buttons {
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
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #2e3d7c;
  font-size: 24px;
  cursor: pointer;
  border-radius: 20%;
  &.exit {
    color: #db8918;
    font-size: 26px;
  }
  }
`;

export default CallRoom;
