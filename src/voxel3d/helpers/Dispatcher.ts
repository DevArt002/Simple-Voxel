import { EventDispatcher } from 'three';

// Globally accessible Dispatcher
export const dispatcher = new EventDispatcher();

export enum Events {
  HIERARCHY_UPDATE = 'hierarchyUpdate',
}
