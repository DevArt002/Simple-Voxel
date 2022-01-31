import { CSSProperties } from 'react';

export type TDropdownOption = {
  color: string;
  mesh: string;
};

export interface IDropdownProps {
  className?: string;
  style?: CSSProperties;
  onChange: (active: number) => void;
  value: number;
  options: TDropdownOption[];
}
