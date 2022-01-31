import React, { useRef, useEffect } from 'react';
// Components
import { Panel, HierarchyView } from '@/Components';
// Voxel 3D
import Voxel3D from '@/Voxel3D';
// Styles
import s from './App.module.scss';

function App() {
  const voxel3DContainerRef = useRef<HTMLDivElement | null>(null);
  const voxel3DInstanceRef = useRef<Voxel3D | null>(null);

  // Process right after component is mounted
  useEffect(() => {
    // Instantiate voxel3d
    if (voxel3DContainerRef.current) {
      voxel3DInstanceRef.current = new Voxel3D(voxel3DContainerRef.current);
    }

    return () => {
      // Dispose voxel3d instance
      voxel3DInstanceRef.current?.dispose();
    };
  }, []);

  return (
    <div className={s.app}>
      <div ref={voxel3DContainerRef} className={s.canvasContainer} />
      <HierarchyView />
      <Panel />
    </div>
  );
}

export default App;
