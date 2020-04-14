/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';
import CallButton from '../CallButton';
import { GlobalContext } from '../../context/globalContext';

const CallRoom = ({ className, history }) => {
  const { roomName, setParticipantCount } = useContext(GlobalContext);

  const {
    isVideoEnabled,
    isAudioEnabled,
    startRoom,
    toggleAudio,
    toggleVideo,
    toggleShareScreen,
    hangup,
    getMicrophones,
    setMicrophone,
    audioInputs,
    getOutputAudio,
    setOutputAudio,
    audioOutputs,
    getVideo,
    setVideo,
    videoInputs,
    participantNumber
  } = useConference({
    roomDOM: '#chatRoom',
    roomName
  });

  useEffect(() => {
    if (roomName) startRoom();
  }, [roomName]);

  useEffect(() => {
    setParticipantCount(participantNumber);
  }, [participantNumber]);

  return (
    <ChatRoom className={className}>
      <div className="chat-visor" id="chatRoom" />
      <div className="chat-buttons">
        <CallButton
          onClickHandler={toggleShareScreen}
          iconClassName="fa fa-user-plus"
        />
        <CallButton
          onClickHandler={toggleShareScreen}
          iconClassName="fa fa-tv"
        />
        <CallButton
          onClickHandler={toggleAudio}
          iconClassName={`fa fa-microphone${isAudioEnabled ? '' : '-slash'}`}
        />
        <CallButton
          onClickHandler={toggleVideo}
          iconClassName={`fa fa-video${isVideoEnabled ? '' : '-slash'}`}
        />
        <CallButton
          className="exit"
          onClickHandler={() => history.push('')}
          iconClassName="fa fa-phone-slash"
        />
      </div>
      <div>
        <select id="audioInput" name="audioInput" onClick={getMicrophones}>
          {audioInputs.map(({ deviceId, label }) => (
            <option value={deviceId}>{label}</option>
          ))}
        </select>

        <select id="audioOutput" name="audioOutput" onClick={getOutputAudio}>
          {audioOutputs.map(({ deviceId, label }) => (
            <option value={deviceId}>{label}</option>
          ))}
        </select>

        <select id="videoInput" name="videoInput" onClick={getVideo}>
          {videoInputs.map(({ deviceId, label }) => (
            <option value={deviceId}>{label}</option>
          ))}
        </select>
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
