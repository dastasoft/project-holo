/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';

import useConference from '../hook/useConference';
import CallButton from './CallButton';
import MenuButton from './MenuButton';
import { GlobalContext } from '../context/globalContext';

const CallRoom = ({ history }) => {
  const {
    roomName,
    roomPassword,
    setParticipantCount,
    setParticipantId,
    socket,
    broadcastRoomJoin
  } = useContext(GlobalContext);

  const {
    isVideoEnabled,
    isAudioEnabled,
    isScreenShareEnabled,
    isTileViewEnabled,
    participantNumber,
    participantId,
    audioInputList,
    audioOutputList,
    videoInputList,
    onFullScreen,
    toggleAudio,
    toggleVideo,
    toggleShareScreen,
    toggleMosaic,
    getAudioInputs,
    getAudioOutputs,
    getVideoInputs,
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

  useEffect(() => {
    if (participantId) {
      setParticipantId(participantId);
    }
  }, [participantId]);

  const callButtonsStyle = 'my-2 mx-2';

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex-grow bg-gray-300" id="chatRoom" />
      <div className="flex  flex-wrap justify-center bg-black">
        <CallButton
          className={`${
            isScreenShareEnabled ? 'active' : ''
          } ${callButtonsStyle}  ml-0`}
          onClickHandler={toggleShareScreen}
          iconClassName="fa fa-tv"
        />
        <CallButton
          className={callButtonsStyle}
          onClickHandler={toggleAudio}
          iconClassName={`fa fa-microphone${isAudioEnabled ? '' : '-slash'}`}
        />
        <CallButton
          className={callButtonsStyle}
          onClickHandler={toggleVideo}
          iconClassName={`fa fa-video${isVideoEnabled ? '' : '-slash'}`}
        />
        <CallButton
          className={`exit ${callButtonsStyle}`}
          onClickHandler={() => history.push('')}
          iconClassName="fa fa-phone-slash"
        />
        <CallButton
          className={`${isTileViewEnabled ? 'active' : ''} ${callButtonsStyle}`}
          onClickHandler={toggleMosaic}
          iconClassName="fas fa-border-all"
        />
        <CallButton
          className={callButtonsStyle}
          onClickHandler={onFullScreen}
          iconClassName="fa fa-window-maximize"
        />
        <MenuButton
          className={callButtonsStyle}
          iconClassName="fas fa-hat-wizard"
          tooltip={
            <div className="flex flex-wrap">
              <CallButton
                className="m-2"
                onClickHandler={() =>
                  socket.emit('action', {
                    room: roomName,
                    action: 'confetti'
                  })
                }
                iconClassName="fas fa-gift"
              />
              <CallButton
                className="m-2"
                onClickHandler={() =>
                  socket.emit('action', {
                    room: roomName,
                    action: 'fireworks'
                  })
                }
                iconClassName="fas fa-fire"
              />
            </div>
          }
        />
        <MenuButton
          className={callButtonsStyle}
          iconClassName="fas fa-music"
          tooltip={
            <div className="flex flex-wrap">
              {[
                { name: 'anysAnys', icon: 'fas fa-birthday-cake' },
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
                  className="m-2"
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
            </div>
          }
        />
        <CallButton
          className={callButtonsStyle}
          onClickHandler={() =>
            window.open(
              'https://the-four-lords.github.io/congress-crush-web-v/',
              '_blank'
            )
          }
          iconClassName="fas fa-gamepad"
        />
        <CallButton
          className={`${callButtonsStyle} mr-0`}
          onClickHandler={() =>
            socket.emit('action', {
              room: roomName,
              action: 'buzz',
              value: participantId
            })
          }
          iconClassName="fas fa-bullhorn"
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
    </div>
  );
};

export default CallRoom;
