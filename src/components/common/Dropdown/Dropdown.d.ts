import { ICommonComponentProps, TMeshTypeOption } from '@/Types';

export interface IDropdownProps extends ICommonComponentProps {
  onChange: (active: number) => void;
  value: number;
  options: TMeshTypeOption[];
}
