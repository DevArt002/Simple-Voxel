import React, { FC, memo, MouseEvent, useCallback } from 'react';
// Components
import { Button } from '@/Components';
// Hooks
import { usePressHold } from '@/Hooks';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Types
import { ITransControlProps } from './TransControl.d';
import { ETransDir } from '@/Types';
// Styles
import s from './TransControl.module.scss';

const TransControl: FC<ITransControlProps> = ({ className, style, ...rest }) => {
  // Callback when translate button pressed
  const mouseDownCallback = useCallback((e: MouseEvent) => {
    const { name: direction } = e.target as HTMLButtonElement;

    // Dispatch event for translating current mesh
    dispatcher.dispatchEvent({
      type: Events.TRANSLATE_MESH,
      direction,
    });
  }, []);

  const [handleMouseDown, handleMouseUp] = usePressHold(mouseDownCallback);

  return (
    <div className={`${s.transControl} ${className}`} style={style} {...rest}>
      <p>Translate</p>
      <div className={s.row}>
        <Button
          name={ETransDir.UP}
          className={s.controlBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Up
        </Button>
      </div>
      <div className={s.row}>
        <Button
          name={ETransDir.LEFT}
          className={s.controlBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Left
        </Button>
        <Button
          name={ETransDir.DOWN}
          className={s.controlBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Down
        </Button>
        <Button
          name={ETransDir.RIGHT}
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

export default memo(TransControl);
