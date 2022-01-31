import { ICommonComponentProps } from '@/Types';

export type TDropdownOption = {
  color: string;
  mesh: string;
};

export interface IDropdownProps extends ICommonComponentProps {
  onChange: (active: number) => void;
  value: number;
  options: TDropdownOption[];
}
