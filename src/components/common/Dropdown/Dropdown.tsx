import React, { FC, memo, useCallback } from 'react';
// Types
import { IDropdownProps } from './Dropdown.d';
import { TMeshTypeOption } from '@/Types';
// Styles
import s from './Dropdown.module.scss';

const Dropdown: FC<IDropdownProps> = ({ className, style, onChange, value, options, ...rest }) => {
  // Generate button content with option
  const generatBtnConent = useCallback(
    (option: TMeshTypeOption) => (
      <>
        {option?.color && <span style={{ background: option.color }} />}
        <label>{option?.mesh || 'select mesh'}</label>
      </>
    ),
    [],
  );

  return (
    <div className={`${s.dropdown} ${className}`} style={style} {...rest}>
      <button className={s.dropBtn}>{generatBtnConent(options[value])}</button>
      <div className={s.dropdownContent}>
        {options.map((option, index) => (
          <button
            key={`option-${index}`}
            className={s.optionBtn}
            onMouseDown={() => onChange(index)}>
            {generatBtnConent(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(Dropdown);
