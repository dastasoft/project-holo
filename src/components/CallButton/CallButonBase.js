import React from 'react';
import { string, func } from 'prop-types';

const CallButtonBase = ({ className, onClickHandler, iconClassName }) => (
  <button type="button" className={className} onClick={onClickHandler}>
    <i className={iconClassName} />
  </button>
);

CallButtonBase.propTypes = {
  className: string.isRequired,
  onClickHandler: func,
  iconClassName: string
};

CallButtonBase.defaultProps = {
  onClickHandler: () => {},
  iconClassName: ''
};

export default CallButtonBase;
