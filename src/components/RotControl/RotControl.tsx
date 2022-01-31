import React, { FC, memo, MouseEvent, useCallback } from 'react';
// Components
import { Button } from '@/Components';
// Hooks
import { usePressHold } from '@/Hooks';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Types
import { IRotControlProps } from './RotControl.d';
import { ERotDir } from '@/Types';
// Styles
import s from './RotControl.module.scss';

const RotControl: FC<IRotControlProps> = ({ className, style, ...rest }) => {
  // Callback when rotation button pressed
  const mouseDownCallback = useCallback((e: MouseEvent) => {
    const { name: direction } = e.target as HTMLButtonElement;

    // Dispatch event for rotating current mesh
    dispatcher.dispatchEvent({
      type: Events.TRANSLATE_MESH,
      direction,
    });
  }, []);

  const [handleMouseDown, handleMouseUp] = usePressHold(mouseDownCallback);

  return (
    <div className={`${s.rotControl} ${className}`} style={style} {...rest}>
      <p>Rotate</p>
      <div className={s.row}>
        <Button
          name={ERotDir.LEFT}
          className={s.controlBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Left
        </Button>
        <Button
          name={ERotDir.RIGHT}
          className={s.controlBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Right
        </Button>
      </div>
    </div>
  );
};

export default memo(RotControl);
