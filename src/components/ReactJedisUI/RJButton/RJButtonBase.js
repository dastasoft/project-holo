/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const RJButtonBase = ({ ...others }) => <button type="button" {...others} />;

export default RJButtonBase;
