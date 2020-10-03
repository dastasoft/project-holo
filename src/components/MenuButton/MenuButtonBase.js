/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { bool, string, func, node } from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const MenuButtonBase = ({
  className,
  onClickHandler,
  iconClassName,
  isCustom,
  customImg,
  customAlt,
  tooltip
}) => {
  return (
    <div>
      <Tippy
        content={tooltip}
        arrow
        animation="scale"
        interactive
        duration={10}
      >
        <button type="button" className={className} onClick={onClickHandler}>
          {isCustom ? (
            <img src={customImg} alt={customAlt} />
          ) : (
            <i className={iconClassName} />
          )}
        </button>
      </Tippy>
    </div>
  );
};

MenuButtonBase.propTypes = {
  className: string.isRequired,
  onClickHandler: func,
  iconClassName: string,
  isCustom: bool,
  customImg: node,
  customAlt: string
};

MenuButtonBase.defaultProps = {
  onClickHandler: () => {},
  iconClassName: '',
  isCustom: false,
  customImg: null,
  customAlt: ''
};

export default MenuButtonBase;
