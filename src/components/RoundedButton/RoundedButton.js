import React from 'react';

import { Back, Prev, Next, Sign, Download } from '../Icon';

import './RoundedButton.scss';

const icons = {
  back: <Back />,
  prev: <Prev />,
  next: <Next />,
  sign: <Sign />,
  download: <Download />
};

const iconStyles = {
  back: { padding: '0 0 2px 2px' },
  prev: { padding: '0 4px 0 0' },
  next: { padding: '0 0 0 4px' }
}

const RoundedButton = ({ onClick, icon, disabled }) => {
  const buttonIcon = icons[icon] ? icons[icon] : 'icon';
  const styles = iconStyles[icon] ? iconStyles[icon] : {};

  return (
    <div role="button" style={styles} className={`rounded-button ${disabled ? 'disabled' : ''}`} onClick={(event) => !disabled && onClick(event)}>
      {buttonIcon}
    </div>
  );
}
 
export default RoundedButton;