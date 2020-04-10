import { useState } from 'react';

const interfaceConfig = {
  DEFAULT_BACKGROUND: 'teal',
  DISABLE_VIDEO_BACKGROUND: false,
  INITIAL_TOOLBAR_TIMEOUT: 20000,
  TOOLBAR_TIMEOUT: 4000,
  TOOLBAR_ALWAYS_VISIBLE: false,
  DEFAULT_REMOTE_DISPLAY_NAME: 'USER',
  DEFAULT_LOCAL_DISPLAY_NAME: 'SUPER',
  SHOW_JITSI_WATERMARK: false,
  JITSI_WATERMARK_LINK: 'https://jitsi.org',
  SHOW_WATERMARK_FOR_GUESTS: false,
  SHOW_BRAND_WATERMARK: true,
  BRAND_WATERMARK_LINK:
    'https://i.pinimg.com/originals/ef/1e/1e/ef1e1e7787a813d943d3bf48262c97d8.jpg',
  SHOW_POWERED_BY: false,
  SHOW_DEEP_LINKING_IMAGE: false,
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
  DISPLAY_WELCOME_PAGE_CONTENT: true,
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
  APP_NAME: 'Jitsi Meet',
  NATIVE_APP_NAME: 'Jitsi Meet',
  PROVIDER_NAME: 'Jitsi',
  LANG_DETECTION: true,
  INVITATION_POWERED_BY: true,
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
  MOBILE_APP_PROMO: true,
  MAXIMUM_ZOOMING_COEFFICIENT: 1.3,
  SUPPORT_URL: 'https://community.jitsi.org/',
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
  roomName = 'AncertTest',
  roomDOM = '#root',
  width,
  height,
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
        width,
        height,
        interfaceConfigOverwrite: interfaceConfig,
        userInfo: {
          email: adminEmail
        }
      })
    );
  };

  const roomNameChange = newName => {
    api.executeCommand('subject', newName);
  };

  const toggleAudio = () => {
    api.executeCommand('toggleAudio');
    api.isAudioMuted().then(muted => {
      console.log('[audio]', muted);
      setIsAudioEnabled(!muted);
    });
  };
  const toggleVideo = () => {
    api.executeCommand('toggleVideo');
    api.isVideoMuted().then(muted => {
      console.log('[video]', muted);
      setIsVideoEnabled(!muted);
    });
  };

  const toggleChat = () => {
    api.executeCommand('toggleChat');
    setIsChatEnabled(!isChatEnabled);
  };

  const toggleShareScreen = () => {
    api.executeCommand('toggleShareScreen');
    setIsScreenShareEnabled(!isScreenShareEnabled);
  };

  const toggleTileView = () => {
    api.executeCommand('toggleTileView');
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
    roomNameChange,
    toggleAudio,
    toggleVideo,
    toggleChat,
    toggleShareScreen,
    toggleTileView,
    hangup
  };
}

export default useConference;
