import React, { useRef } from 'react';
// Components
import { Panel } from '@/Components';
// Style
import s from './App.module.scss';

function App() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={s.app}>
      <div ref={canvasContainerRef} className={s.canvasContainer} />
      <Panel />
    </div>
  );
}

export default App;
