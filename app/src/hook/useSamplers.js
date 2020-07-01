import { useState, useEffect } from 'react';
import { Howl } from 'howler';

import anysAnys from '../assets/sounds/anys_anys.m4a';
import coffinDance from '../assets/sounds/coffin_dance.mp3';
import doorKnock from '../assets/sounds/door_knock.mp3';
import epicSaxGuy from '../assets/sounds/epic_sax_guy.mp3';
import jokeDrumEffect from '../assets/sounds/joke_drum_effect.mp3';
import ohYeah from '../assets/sounds/oh_yeah.mp3';
import surpriseMotherfucker from '../assets/sounds/surprise_motherfucker.mp3';

function useSamplers() {
  const [sound, setSound] = useState(null);

  const defaultHowlConfig = {
    autoplay: false,
    loop: false,
    volume: 0.2
  };

  const getSample = action => {
    switch (action) {
      case 'anysAnys':
        return anysAnys;
      case 'coffinDance':
        return coffinDance;
      case 'doorKnock':
        return doorKnock;
      case 'epicSaxGuy':
        return epicSaxGuy;
      case 'jokeDrumEffect':
        return jokeDrumEffect;
      case 'ohYeah':
        return ohYeah;
      case 'surpriseMotherfucker':
        return surpriseMotherfucker;
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
