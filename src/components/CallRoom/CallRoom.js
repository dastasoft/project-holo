/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import useConference from '../../hook/useConference';
import CallButton from '../CallButton';
import MenuButton from '../MenuButton';
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
      startRoom();
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
          <MenuButton
            iconClassName="fas fa-hat-wizard"
            tooltip={
              <TooltipContet>
                <CallButton
                  onClickHandler={() =>
                    socket.emit('action', {
                      room: roomName,
                      action: 'confetti'
                    })
                  }
                  iconClassName="fas fa-gift"
                />
                <CallButton
                  onClickHandler={() =>
                    socket.emit('action', {
                      room: roomName,
                      action: 'fireworks'
                    })
                  }
                  iconClassName="fas fa-fire"
                />
              </TooltipContet>
            }
          />
          <MenuButton
            onClickHandler={() =>
              socket.emit('action', { room: roomName, action: 'confetti' })
            }
            iconClassName="fas fa-music"
            tooltip={
              <TooltipContet>
                {[
                  { name: 'coffinDance', icon: 'fab fa-napster' },
                  { name: 'doorKnock', icon: 'fas fa-dungeon' },
                  { name: 'epicSaxGuy', icon: 'fas fa-pepper-hot' },
                  { name: 'jokeDrumEffect', icon: 'fas fa-drum' },
                  {
                    name: 'ohYeah',
                    icon: 'fas fa-american-sign-language-interpreting'
                  },
                  { name: 'surpriseMotherfucker', icon: 'fas fa-surprise' }
                ].map(sample => (
                  <CallButton
                    onClickHandler={() =>
                      socket.emit('action', {
                        room: roomName,
                        action: 'playSample',
                        value: sample.name
                      })
                    }
                    iconClassName={sample.icon}
                  />
                ))}
              </TooltipContet>
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

const TooltipContet = styled.div`
  display: flex;
  > * {
    margin: 4px;
  }
`;

export default CallRoom;
