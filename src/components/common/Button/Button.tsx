import React, { FC, memo } from 'react';
// Types
import { IButtonProps } from './Button.d';
// Styles
import s from './Button.module.scss';

const Button: FC<IButtonProps> = ({
  className,
  style,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      className={`${s.button} ${className}`}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
};

export default memo(Button);
