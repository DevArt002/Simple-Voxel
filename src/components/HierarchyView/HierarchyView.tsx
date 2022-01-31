import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { Event, Object3D } from 'three';
import TreeMenu, { TreeNodeInArray } from 'react-simple-tree-menu';
// Types
import { IHierarchyViewProps } from './HierarchyView.d';
// Voxel 3D
import { dispatcher, Events } from '@/Voxel3D';
// Styles
import s from './HierarchyView.module.scss';
import 'react-simple-tree-menu/dist/main.css';

// Generate TreeNode data for TreeMenu
const generateTreeNode = (children: Object3D[], parentKey: string = '0'): TreeNodeInArray[] =>
  children.map((child, index) => {
    const key = `${parentKey}-${index}`;

    return {
      key,
      label: child.name || `[${child.type}]`,
      nodes: generateTreeNode(child.children),
    };
  });

const HierarchyView: FC<IHierarchyViewProps> = ({ className, style, ...rest }) => {
  const [data, setData] = useState<TreeNodeInArray[] | undefined>(undefined);

  // Listen when voxel3d hierarchy is updated
  const handleHierarchyUpdate = useCallback((event: Event) => {
    const newData = generateTreeNode(event?.scene?.children || []);

    setData(newData);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    // Add event listeners
    dispatcher.addEventListener(Events.HIERARCHY_UPDATE, handleHierarchyUpdate);

    return () => {
      // Remove event listeners
      dispatcher.removeEventListener(Events.HIERARCHY_UPDATE, handleHierarchyUpdate);
    };
  }, [handleHierarchyUpdate]);

  return (
    <div className={`${s.hierarchyView} ${className}`} style={style} {...rest}>
      <TreeMenu data={data} />
    </div>
  );
};

export default memo(HierarchyView);
