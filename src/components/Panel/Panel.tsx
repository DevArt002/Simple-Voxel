import React, { FC, memo, useCallback, useState } from 'react';
// Components
import { Dropdown } from '@/Components';
// Types
import { IPanelProps } from './Panel.d';
// Constants
import { MESH_OPTIONS } from '@/Constants';
// Style
import s from './Panel.module.scss';

const Panel: FC<IPanelProps> = ({ className, style, ...rest }) => {
  const [activeMeshId, setActiveMeshId] = useState<number>(-1);

  // Listen when mesh dropdown change
  const handleMeshDropdownChange = useCallback((id) => {
    setActiveMeshId(id);
  }, []);

  return (
    <div className={`${s.panel} ${className}`} style={style} {...rest}>
      <Dropdown onChange={handleMeshDropdownChange} value={activeMeshId} options={MESH_OPTIONS} />
    </div>
  );
};

export default memo(Panel);
