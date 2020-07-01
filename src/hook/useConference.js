/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const interfaceConfig = {
  APP_NAME: 'Grow Meeting',
  AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
  AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',
  AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
  BRAND_WATERMARK_LINK: '',
  CLOSE_PAGE_GUEST_HINT: false,
  CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
  CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
  CONNECTION_INDICATOR_DISABLED: false,
  DEFAULT_BACKGROUND: '#474747',
  DEFAULT_LOCAL_DISPLAY_NAME: 'Grow Participant',
  DEFAULT_LOGO_URL: '',
  DEFAULT_REMOTE_DISPLAY_NAME: 'Grow Participant',
  DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
  DISABLE_FOCUS_INDICATOR: false,
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
  DISABLE_PRESENCE_STATUS: false,
  DISABLE_RINGING: false,
  DISABLE_TRANSCRIPTION_SUBTITLES: false,
  DISABLE_VIDEO_BACKGROUND: false,
  DISPLAY_WELCOME_PAGE_CONTENT: false,
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
  ENABLE_DIAL_OUT: true,
  ENABLE_FEEDBACK_ANIMATION: false,
  FILM_STRIP_MAX_HEIGHT: 120,
  filmStripOnly: false,
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
  HIDE_INVITE_MORE_HEADER: false,
  INITIAL_TOOLBAR_TIMEOUT: 20000,
  JITSI_WATERMARK_LINK: 'https://dastasoft.netlify.app/',
  LANG_DETECTION: true,
  LIVE_STREAMING_HELP_LINK: 'https://jitsi.org/live',
  LOCAL_THUMBNAIL_RATIO: 16 / 9,
  MAXIMUM_ZOOMING_COEFFICIENT: 1.3,
  MOBILE_APP_PROMO: false,
  NATIVE_APP_NAME: 'Grow Meeting',
  OPTIMAL_BROWSERS: ['chrome', 'chromium', 'firefox', 'electron'],
  POLICY_LOGO: null,
  PROVIDER_NAME: 'Jitsi',
  RECENT_LIST_ENABLED: true,
  REMOTE_THUMBNAIL_RATIO: 1,
  SETTINGS_SECTIONS: [],
  SHOW_BRAND_WATERMARK: false,
  SHOW_CHROME_EXTENSION_BANNER: false,
  SHOW_DEEP_LINKING_IMAGE: false,
  SHOW_JITSI_WATERMARK: false,
  SHOW_POWERED_BY: false,
  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
  SHOW_WATERMARK_FOR_GUESTS: false,
  SUPPORT_URL: 'https://community.jitsi.org/',
  TOOLBAR_ALWAYS_VISIBLE: false,
  TOOLBAR_BUTTONS: ['security'],
  TOOLBAR_TIMEOUT: 4000,
  UNSUPPORTED_BROWSERS: [],
  VERTICAL_FILMSTRIP: true,
  VIDEO_LAYOUT_FIT: 'both',
  VIDEO_QUALITY_LABEL_DISABLED: false
  /**
   * Specify custom URL for downloading android mobile app.
   */
  // MOBILE_DOWNLOAD_LINK_ANDROID: 'https://play.google.com/store/apps/details?id=org.jitsi.meet',

  /**
   * Specify URL for downloading ios mobile app.
   */
  // MOBILE_DOWNLOAD_LINK_IOS: 'https://itunes.apple.com/us/app/jitsi-meet/id1165103905',

  /**
   * Specify mobile app scheme for opening the app from the mobile browser.
   */
  // APP_SCHEME: 'org.jitsi.meet',

  /**
   * Specify the Android app package name.
   */
  // ANDROID_APP_PACKAGE: 'org.jitsi.meet',
};

function useConference({
  roomName = 'Custom Room',
  roomDOM = '#root',
  customDomain = 'meet.jit.si',
  adminEmail = '',
  password = ''
}) {
  const [api, setApi] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
  const [isTileViewEnabled, setIsTileViewEnabled] = useState(false);
  const [participantNumber, setParticipantNumber] = useState(0);
  const [participantId, setParticipantId] = useState('');
  const [audioInputList, setAudioInputList] = useState([]);
  const [audioOutputList, setAudioOutputList] = useState([]);
  const [videoInputList, setVideoInputList] = useState([]);

  const startRoom = () => {
    setApi(
      new JitsiMeetExternalAPI(customDomain, {
        roomName,
        parentNode: document.querySelector(roomDOM),
        configOverwrite: {
          defaultLanguage: 'es'
        },
        interfaceConfigOverwrite: interfaceConfig,
        userInfo: {
          email: adminEmail
        },
        onload: event => {
          console.log(event);
          console.log(event.target);
        }
      })
    );
  };

  const onFullScreen = () => {
    const video = document.querySelector(roomDOM);

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const toggleAudio = () => {
    api.executeCommand('toggleAudio');
  };
  const toggleVideo = () => {
    api.executeCommand('toggleVideo');
  };

  const toggleChat = () => {
    api.executeCommand('toggleChat');
  };

  const toggleShareScreen = () => {
    api.executeCommand('toggleShareScreen');
  };

  const toggleMosaic = () => {
    api.executeCommand('toggleTileView');
  };

  const hangup = () => {
    api.executeCommand('hangup');
  };

  const participantManagement = id => {
    const num = api.getNumberOfParticipants();
    setParticipantNumber(num > 0 ? num : 0);
    if (id) setParticipantId(id);
  };

  const audioMuteChangeHandler = muted => setIsAudioEnabled(!muted);
  const videoMuteChangeHandler = muted => setIsVideoEnabled(!muted);
  const screenSharingChangeHandler = enable => setIsScreenShareEnabled(enable);
  const tileViewChangedHandler = enabled => setIsTileViewEnabled(enabled);

  const getAudioInputs = () => {
    api
      .getAvailableDevices()
      .then(({ audioInput }) => setAudioInputList(audioInput));
  };

  const getAudioOutputs = () => {
    api
      .getAvailableDevices()
      .then(({ audioOutput }) => setAudioOutputList(audioOutput));
  };

  const getVideoInputs = () => {
    api
      .getAvailableDevices()
      .then(({ videoInput }) => setVideoInputList(videoInput));
  };

  const setAudioInputs = (deviceLabel, deviceId) => {
    api.setAudioInputDevice(deviceLabel, deviceId);
  };

  const setAudioOutputs = (deviceLabel, deviceId) => {
    api.setAudioOutputDevice(deviceLabel, deviceId);
  };

  const setVideoInputs = (deviceLabel, deviceId) => {
    api.setVideoInputDevice(deviceLabel, deviceId);
  };

  const setPassword = newPassword => {
    api.executeCommand('password', newPassword);
  };

  useEffect(() => {
    // It's a good practice to remove the conference before the page is unloaded.
    return () => {
      if (api) api.dispose();
    };
  }, []);

  useEffect(() => {
    if (api) {
      api.addEventListeners({
        participantJoined: ({ id, displayName }) => participantManagement(),
        participantLeft: ({ id }) => participantManagement(),
        participantKickedOut: ({ kicked, kicker }) => participantManagement(),
        videoConferenceJoined: ({ roomName, id, displayName, avatarURL }) => {
          setPassword(password);
          participantManagement(id);
        },
        audioMuteStatusChanged: ({ muted }) => audioMuteChangeHandler(muted),
        videoMuteStatusChanged: ({ muted }) => videoMuteChangeHandler(muted),
        screenSharingStatusChanged: ({ on }) => screenSharingChangeHandler(on),
        tileViewChanged: ({ enabled }) => tileViewChangedHandler(enabled)
      });

      getAudioInputs();
      getAudioOutputs();
      getVideoInputs();
    }
  }, [api]);

  return {
    isVideoEnabled,
    isAudioEnabled,
    isChatEnabled,
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
  };
}

export default useConference;
