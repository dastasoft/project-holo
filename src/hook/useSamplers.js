import { useState, useEffect } from 'react';
import { Howl } from 'howler';

import coffinDance from '../assets/sounds/coffin_dance.mp3';
import jokeDrumEffect from '../assets/sounds/joke_drum_effect.mp3';

function useSamplers() {
  const [sound, setSound] = useState(null);

  const defaultHowlConfig = {
    autoplay: false,
    loop: false,
    volume: 0.5
  };

  const getSample = action => {
    switch (action) {
      case 'coffinDance':
        return coffinDance;
      case 'jokeDrumEffect':
        return jokeDrumEffect;
      default:
        return null;
    }
  };

  const playSample = action => {
    setSound(
      new Howl({
        src: [getSample(action)],
        ...defaultHowlConfig
      })
    );
  };

  useEffect(() => {
    if (sound) sound.play();
  }, [sound]);

  return { playSample };
}

export default useSamplers;
