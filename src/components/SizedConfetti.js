/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import ReactConfetti from 'react-confetti';

const SizedConfetti = ({ isParty, ...others }) => {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={isParty ? 800 : 0}
      {...others}
    />
  );
};

export default SizedConfetti;
