import { ReactNode } from 'react';
import { ICommonComponentProps, TEventFunc } from '@/Types';

export interface IButtonProps extends ICommonComponentProps {
  onMouseDown?: TEventFunc;
  onMouseUp?: TEventFunc;
  onMouseLeave?: TEventFunc;
  onClick?: TEventFunc;
  children?: ReactNode;
}
