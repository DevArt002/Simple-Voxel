import { Object3D, Camera, Raycaster, Vector2 } from 'three';
// Utils
import { dispatcher, Events } from './Dispatcher';
// Types
import { EPointer } from '@/Types';
// Constants
import { MESH_NAMES } from '@/Constants';

export class Interactor {
  public objects: Object3D[]; // List of 3D objects we can interact with
  public hovObjects: Object3D[]; // List of hoverable objects

  private container: HTMLDivElement; // Div element for enveloping canvas
  private camera: Camera; // Camera
  private mouse: Vector2; // Vector2 for tracking mouse position
  private raycaster: Raycaster; // Raycaster object
  private isMoved: boolean; // Mouse moved state

  constructor(container: HTMLDivElement, camera: Camera) {
    this.container = container;
    this.camera = camera;
    this.objects = [];
    this.hovObjects = [];
    this.mouse = new Vector2();
    this.raycaster = new Raycaster();
    this.isMoved = false;

    this.init();
  }

  /**
   * Initialize
   */
  init() {
    this.eventListenerSetup();
  }

  /**
   * Setup event listeners
   */
  eventListenerSetup() {
    this.container.addEventListener('pointerdown', this.onPointerDown, false);
    this.container.addEventListener('pointermove', this.onPointerMove, false);
    this.container.addEventListener('pointerup', this.onPointerUp, false);
  }

  /**
   * Dispose event listeners
   */
  eventListenerDispose() {
    this.container.removeEventListener('pointerdown', this.onPointerDown, false);
    this.container.removeEventListener('pointermove', this.onPointerMove, false);
    this.container.removeEventListener('pointerup', this.onPointerUp, false);
  }

  /**
   * Mouse down event listener
   */
  onPointerDown = () => {
    this.isMoved = false;

    // TODO Actions for mouse down
  };

  /**
   * Mouse move event listener
   */
  onPointerMove = (evt: PointerEvent) => {
    this.isMoved = true;

    const intersect = this.getIntersection(evt);
    const intersectedObj = intersect?.object;
    const intersectObjName = intersectedObj?.name;

    // Hover or not
    if (intersectObjName && this.hovObjects.some((item) => item === intersectedObj)) {
      this.changePointer(EPointer.POINTER);
    } else {
      this.changePointer(EPointer.AUTO);
    }
  };

  /**
   * Mouse up event listener
   */
  onPointerUp = (evt: PointerEvent) => {
    const intersect = this.getIntersection(evt);
    const intersectObjName = intersect?.object?.name;

    // Dispatch events corresponding to object
    if (!this.isMoved && intersectObjName === MESH_NAMES.RAY_RECEIVER) {
      dispatcher.dispatchEvent({
        type: Events.ADD_MESH,
        intersect,
      });
    }
  };

  getIntersection(evt: PointerEvent) {
    const { offsetWidth: width, offsetHeight: height } = this.container;
    let x = evt.clientX;
    let y = evt.clientY;

    this.mouse.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);

    if (!intersects.length) return null;

    return intersects[0];
  }

  /**
   * Add object that can be interractive (on click, hover etc...)
   * @param object an object that will be checked by the raycaster
   */
  add(object: Object3D, hoverable = false) {
    if (this.objects.some((item) => item === object)) return;

    this.objects.push(object);
    hoverable && this.hovObjects.push(object);
  }

  /**
   * Remove object that can be interractive (on click, hover etc...)
   * @param object an object that will be checked by the raycaster
   */
  remove(object: Object3D) {
    this.objects = this.objects.filter((item) => item !== object);
    this.hovObjects = this.hovObjects.filter((item) => item !== object);
  }

  /**
   * Change cursor style of container
   */
  changePointer(target: EPointer) {
    this.container.style.cursor = target;
  }

  /**
   * Tick
   */
  tick() {
    // TODO
  }

  /**
   * Update
   */
  update() {}

  /**
   * Dispose
   */
  dispose() {
    this.eventListenerDispose();
  }
}
