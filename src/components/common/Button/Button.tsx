import React, { FC, memo } from 'react';
// Types
import { IButtonProps, EButtonVariants } from './Button.d';
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
  variant = EButtonVariants.PRIMARY,
  ...rest
}) => {
  return (
    <button
      className={`
        ${s.button} 
        ${variant === EButtonVariants.PRIMARY && s.primary} 
        ${variant === EButtonVariants.SECONDARY && s.secondary} 
        ${className}
      `}
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
