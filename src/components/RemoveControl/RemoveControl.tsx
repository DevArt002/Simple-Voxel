import React, { FC, memo, MouseEvent, useCallback } from 'react';
// Components
import { Button, EButtonVariants } from '@/Components';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Types
import { IRemoveControlProps } from './RemoveControl.d';
import { ERemove } from '@/Types';
// Styles
import s from './RemoveControl.module.scss';

const RemoveControl: FC<IRemoveControlProps> = ({ className, style, ...rest }) => {
  // Callback when rotation button pressed
  const handleMouseClick = useCallback((e: MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;

    // Dispatch event for rotating current mesh
    dispatcher.dispatchEvent({
      type: Events.REMOVE,
      removeAll: name === ERemove.ALL,
    });
  }, []);

  return (
    <div className={`${s.removeControl} ${className}`} style={style} {...rest}>
      <p>Remove</p>
      <div className={s.row}>
        <Button
          name={ERemove.ONE}
          className={s.controlBtn}
          variant={EButtonVariants.SECONDARY}
          onClick={handleMouseClick}>
          Remove
        </Button>
        <Button
          name={ERemove.ALL}
          className={s.controlBtn}
          variant={EButtonVariants.SECONDARY}
          onClick={handleMouseClick}>
          Remove All
        </Button>
      </div>
    </div>
  );
};

export default memo(RemoveControl);
