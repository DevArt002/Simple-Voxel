import React, { FC, memo, useCallback, useState } from 'react';
// Components
import { Dropdown, TransControl, RotControl, RemoveControl } from '@/Components';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Types
import { IPanelProps } from './Panel.d';
// Constants
import { MESH_TYPE_OPTIONS } from '@/Constants';
// Styles
import s from './Panel.module.scss';

const Panel: FC<IPanelProps> = ({ className, style, ...rest }) => {
  const [activeMeshId, setActiveMeshId] = useState<number>(-1);

  // Listen when mesh type change
  const handleMeshTypeChange = useCallback((id) => {
    setActiveMeshId(id);

    // Let 3d know changed mesh option
    dispatcher.dispatchEvent({
      type: Events.MESH_TYPE_UPDATED,
      option: MESH_TYPE_OPTIONS[id],
    });
  }, []);

  return (
    <div className={`${s.panel} ${className}`} style={style} {...rest}>
      <TransControl className={s.mr} />
      <Dropdown
        className={s.mr}
        onChange={handleMeshTypeChange}
        value={activeMeshId}
        options={MESH_TYPE_OPTIONS}
      />
      <div>
        <RotControl />
        <RemoveControl />
      </div>
    </div>
  );
};

export default memo(Panel);
