/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';

const CallRoom = ({ className, roomName }) => {
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
    roomName
  });

  useEffect(() => {
    startRoom();
  }, []);

  return (
    <ChatRoom className={className}>
      <div className="chat-visor" id="chatRoom" />
      <div className="chat-buttons">
        <Button type="button" onClick={toggleShareScreen}>
          <i className="fa fa-user-plus" />
        </Button>
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
          <i className="fa fa-phone-slash" />
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
    background-color: grey;
  }

  .chat-buttons {
    display: flex;
    justify-content: center;
    background-color: black;

    > * {
      margin: 5px 8px;
    }

    > *:first-of-type {
      margin-left: 0;
    }

    > *:last-of-type {
      margin-right: 0;
    }
  }
`;

const Button = styled.button`
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 24px;
  &.exit {
    color: red;
    font-size: 26px;
  }
  }
`;

export default CallRoom;
