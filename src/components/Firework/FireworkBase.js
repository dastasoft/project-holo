/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import fireworks from 'react-fireworks';
import useWindowSize from 'react-use/lib/useWindowSize';

const FireworkBase = ({ className, isActive, onComplete, time }) => {
  const [active, setActive] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isActive) {
      setActive(true);
      setTimeout(() => {
        fireworks.stop();
        setTimeout(() => {
          setActive(false);
          onComplete();
        }, 5000);
      }, time);
    }
  }, [isActive]);

  useEffect(() => {
    if (active) {
      fireworks.init('fireworks', {});
      fireworks.start();
    }
  }, [active]);

  return (
    active && (
      <div className={className} id="fireworks" style={{ width, height }} />
    )
  );
};

export default FireworkBase;
