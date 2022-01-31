import React, { FC, memo, MouseEvent, useCallback } from 'react';
// Components
import { Button } from '@/Components';
// Hooks
import { usePressHold } from '@/Hooks';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Types
import { ITranslatorProps } from './Translator.d';
import { ETransDir } from '@/Types';
// Styles
import s from './Translator.module.scss';

const Translator: FC<ITranslatorProps> = ({ className, style, ...rest }) => {
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
    <div className={`${s.translator} ${className}`} style={style} {...rest}>
      <div className={s.row}>
        <Button
          name={ETransDir.UP}
          className={s.translateBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Up
        </Button>
      </div>
      <div className={s.row}>
        <Button
          name={ETransDir.LEFT}
          className={s.translateBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Left
        </Button>
        <Button
          name={ETransDir.DOWN}
          className={s.translateBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Down
        </Button>
        <Button
          name={ETransDir.RIGHT}
          className={s.translateBtn}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          Right
        </Button>
      </div>
    </div>
  );
};

export default memo(Translator);
