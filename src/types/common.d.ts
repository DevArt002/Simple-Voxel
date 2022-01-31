import { CSSProperties, MouseEvent, HTMLAttributes } from 'react';
import { Vector3 } from 'three';

export interface ICommonComponentProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  name?: string;
}

export enum EPointer {
  POINTER = 'pointer',
  AUTO = 'auto',
}

export type TEventFunc = (e: MouseEvent) => void;

export enum ETransDir {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export type TVelDir = {
  [key in ETransDir]: Vector3;
};
