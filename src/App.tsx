import React, { useRef, useEffect } from 'react';
// Components
import { Panel } from '@/Components';
// Voxel 3D
import Voxel3D from '@/Voxel3D';
// Style
import s from './App.module.scss';

function App() {
  const voxel3DContainerRef = useRef<HTMLDivElement | null>(null);
  const voxel3DInstanceRef = useRef<Voxel3D | null>(null);

  // Initialize voxel 3d instance when 2d component is rendererd
  useEffect(() => {
    if (voxel3DContainerRef.current) {
      voxel3DInstanceRef.current = new Voxel3D(voxel3DContainerRef.current);
    }

    return () => {
      voxel3DInstanceRef.current?.dispose();
    };
  }, []);

  return (
    <div className={s.app}>
      <div ref={voxel3DContainerRef} className={s.canvasContainer} />
      <Panel />
    </div>
  );
}

export default App;
