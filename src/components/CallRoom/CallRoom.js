/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext, useState, useRef } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';
import CallButton from '../CallButton';
import { GlobalContext } from '../../context/globalContext';

const CallRoom = ({ className, history }) => {
  const {
    roomName,
    roomPassword,
    setParticipantCount,
    socket,
    broadcastRoomJoin
  } = useContext(GlobalContext);

  const {
    isVideoEnabled,
    isAudioEnabled,
    isChatEnabled,
    isScreenShareEnabled,
    isTileViewEnabled,
    participantNumber,
    audioInputList,
    audioOutputList,
    videoInputList,
    onFullScreen,
    toggleAudio,
    toggleVideo,
    toggleChat,
    toggleShareScreen,
    toggleMosaic,
    hangup,
    getAudioInputs,
    setAudioInputs,
    getAudioOutputs,
    setAudioOutputs,
    getVideoInputs,
    setVideoInputs,
    startRoom
  } = useConference({
    roomDOM: '#chatRoom',
    roomName,
    password: roomPassword
  });

  useEffect(() => {
    if (roomName) {
      broadcastRoomJoin(roomName);
      //startRoom();
    }
  }, [roomName]);

  useEffect(() => {
    setParticipantCount(participantNumber);
  }, [participantNumber]);

  return (
    <>
      <ChatRoom className={className}>
        <div className="chat-visor" id="chatRoom" />
        <div className="chat-buttons">
          <CallButton
            className={isScreenShareEnabled ? 'active' : ''}
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
          <CallButton
            className={isTileViewEnabled ? 'active' : ''}
            onClickHandler={toggleMosaic}
            iconClassName="fas fa-border-all"
          />
          <CallButton
            onClickHandler={onFullScreen}
            iconClassName="fa fa-window-maximize"
          />
          <CallButton
            onClickHandler={() =>
              socket.emit('action', { room: roomName, action: 'confetti' })
            }
            iconClassName="fas fa-gift"
            tooltip={
              <div>
                <CallButton
                  onClickHandler={() =>
                    socket.emit('action', {
                      room: roomName,
                      action: 'playSample',
                      value: 'coffinDance'
                    })
                  }
                  iconClassName="fab fa-napster"
                />
                <CallButton
                  onClickHandler={() =>
                    socket.emit('action', {
                      room: roomName,
                      action: 'playSample',
                      value: 'jokeDrumEffect'
                    })
                  }
                  iconClassName="fas fa-drum"
                />
              </div>
            }
          />
        </div>
        <div style={{ display: 'none' }}>
          <select id="audioInput" name="audioInput" onClick={getAudioInputs}>
            {audioInputList.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </select>

          <select id="audioOutput" name="audioOutput" onClick={getAudioOutputs}>
            {audioOutputList.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </select>

          <select id="videoInput" name="videoInput" onClick={getVideoInputs}>
            {videoInputList.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </ChatRoom>
    </>
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
