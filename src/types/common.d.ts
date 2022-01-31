import { CSSProperties } from 'react';

export interface ICommonComponentProps {
  className?: string;
  style?: CSSProperties;
}

export enum EPointer {
  POINTER = 'pointer',
  AUTO = 'auto',
}
