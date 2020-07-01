import React from 'react';
import { bool, string, func, node } from 'prop-types';

const CallButtonBase = ({
  className,
  onClickHandler,
  iconClassName,
  isCustom,
  customImg,
  customAlt
}) => {
  return (
    <div>
      <button type="button" className={className} onClick={onClickHandler}>
        {isCustom ? (
          <img src={customImg} alt={customAlt} />
        ) : (
          <i className={iconClassName} />
        )}
      </button>
    </div>
  );
};

CallButtonBase.propTypes = {
  className: string.isRequired,
  onClickHandler: func,
  iconClassName: string,
  isCustom: bool,
  customImg: node,
  customAlt: string
};

CallButtonBase.defaultProps = {
  onClickHandler: () => {},
  iconClassName: '',
  isCustom: false,
  customImg: null,
  customAlt: ''
};

export default CallButtonBase;
