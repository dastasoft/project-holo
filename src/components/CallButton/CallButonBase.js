import React, { useState } from 'react';
import { bool, string, func, node } from 'prop-types';
import Tippy from '@tippyjs/react';
const CallButtonBase = ({
  className,
  onClickHandler,
  iconClassName,
  isCustom,
  customImg,
  customAlt,
  tooltip
}) => {
  const [tootipVisible, setTooltipVisible] = useState(false);
  const onHover = () => setTooltipVisible(true);
  const onBlur = () => setTooltipVisible(false);
  return (
    <div>
      <button
        type="button"
        className={className}
        onClick={onClickHandler}
        onMouseOver={onHover}
        onFocus={onHover}
        onMouseLeave={onBlur}
      >
        {isCustom ? (
          <img src={customImg} alt={customAlt} />
        ) : (
          <i className={iconClassName} />
        )}
      </button>
      <div style={{ position: 'absolute', bottom: '60px' }}>
        {tootipVisible && tooltip}
      </div>
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
