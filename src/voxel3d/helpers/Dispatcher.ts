import { EventDispatcher } from 'three';

// Globally accessible Dispatcher
export const dispatcher = new EventDispatcher();

export enum Events {
  HIERARCHY_UPDATED = 'hierarchyUpdated',
  MESH_TYPE_UPDATED = 'meshTypeUpdated',
  ADD_MESH = 'addMesh',
}
