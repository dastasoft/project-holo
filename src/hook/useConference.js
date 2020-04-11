/* eslint-disable no-undef */
import { useState } from 'react';

const interfaceConfig = {
  DEFAULT_BACKGROUND: 'grey',
  DISABLE_VIDEO_BACKGROUND: false,
  INITIAL_TOOLBAR_TIMEOUT: 20000,
  TOOLBAR_TIMEOUT: 4000,
  TOOLBAR_ALWAYS_VISIBLE: false,
  DEFAULT_REMOTE_DISPLAY_NAME: 'REMOTE',
  DEFAULT_LOCAL_DISPLAY_NAME: 'LOCAL',
  SHOW_JITSI_WATERMARK: false,
  SHOW_WATERMARK_FOR_GUESTS: false,
  SHOW_BRAND_WATERMARK: false,
  BRAND_WATERMARK_LINK: '',
  SHOW_POWERED_BY: false,
  SHOW_DEEP_LINKING_IMAGE: false,
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
  DISPLAY_WELCOME_PAGE_CONTENT: false,
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
  APP_NAME: 'Grow Meeting',
  NATIVE_APP_NAME: 'Grow Meeting App',
  PROVIDER_NAME: 'GrowMeeting',
  LANG_DETECTION: true,
  INVITATION_POWERED_BY: false,
  AUTHENTICATION_ENABLE: true,
  TOOLBAR_BUTTONS: [],
  SETTINGS_SECTIONS: [],
  VIDEO_LAYOUT_FIT: 'both',
  filmStripOnly: false,
  VERTICAL_FILMSTRIP: true,
  CLOSE_PAGE_GUEST_HINT: false,
  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
  RANDOM_AVATAR_URL_PREFIX: false,
  RANDOM_AVATAR_URL_SUFFIX: false,
  FILM_STRIP_MAX_HEIGHT: 120,
  ENABLE_FEEDBACK_ANIMATION: false,
  DISABLE_FOCUS_INDICATOR: false,
  DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
  DISABLE_TRANSCRIPTION_SUBTITLES: false,
  DISABLE_RINGING: false,
  AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
  AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',
  POLICY_LOGO: null,
  LOCAL_THUMBNAIL_RATIO: 16 / 9,
  REMOTE_THUMBNAIL_RATIO: 1,
  LIVE_STREAMING_HELP_LINK: 'https://jitsi.org/live',
  MOBILE_APP_PROMO: false,
  MAXIMUM_ZOOMING_COEFFICIENT: 1.3,
  SUPPORT_URL: 'https://notariado.org/',
  CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
  CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
  CONNECTION_INDICATOR_DISABLED: false,
  VIDEO_QUALITY_LABEL_DISABLED: false,
  RECENT_LIST_ENABLED: true,
  OPTIMAL_BROWSERS: ['chrome', 'chromium', 'firefox', 'nwjs', 'electron'],
  UNSUPPORTED_BROWSERS: [],
  AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
  DISABLE_PRESENCE_STATUS: false,
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  SHOW_CHROME_EXTENSION_BANNER: false
};

function useConference({
  roomName = 'Custom Room',
  roomDOM = '#root',
  customDomain = 'meet.jit.si',
  adminEmail = ''
}) {
  const [api, setApi] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);

  const startRoom = () => {
    setApi(
      new JitsiMeetExternalAPI(customDomain, {
        roomName,
        parentNode: document.querySelector(roomDOM),
        interfaceConfigOverwrite: interfaceConfig,
        userInfo: {
          email: adminEmail
        }
      })
    );
  };

  const toggleAudio = () => {
    api.executeCommand('toggleAudio');
    api.isAudioMuted().then(muted => {
      setIsAudioEnabled(!muted);
    });
  };
  const toggleVideo = () => {
    api.executeCommand('toggleVideo');
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleChat = () => {
    api.executeCommand('toggleChat');
    setIsChatEnabled(!isChatEnabled);
  };

  const toggleShareScreen = () => {
    api.executeCommand('toggleShareScreen');
    setIsScreenShareEnabled(!isScreenShareEnabled);
  };

  const hangup = () => {
    api.executeCommand('hangup');
  };

  return {
    isVideoEnabled,
    isAudioEnabled,
    isChatEnabled,
    isScreenShareEnabled,
    startRoom,
    toggleAudio,
    toggleVideo,
    toggleChat,
    toggleShareScreen,
    hangup
  };
}

export default useConference;
