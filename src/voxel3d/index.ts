import {
  PerspectiveCamera,
  Scene,
  Color,
  WebGLRenderer,
  GridHelper,
  MOUSE,
  Group,
  DirectionalLight,
  AmbientLight,
  PlaneBufferGeometry,
  Mesh,
  Event,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
// Helpers
import { dispatcher, Events, Interactor } from './helpers';
// Models
import { Voxel } from './models';
// Types
import { TMeshTypeOption } from '@/Types';
// Constants
import { MESH_NAMES } from '@/Constants';

export class Voxel3D {
  private container: HTMLDivElement; // Div element for enveloping canvas
  private width: number; // Canvas width
  private height: number; // Canvas height
  private pixelRatio: number; // Display ratio
  private aspect: number; // Camera aspect
  private renderer!: WebGLRenderer; // Renderer
  private scene!: Scene; // Scene
  private camera!: PerspectiveCamera; // Camera
  private controls!: OrbitControls; // Camera controls
  private gridHelper!: GridHelper; // Grid helper
  private rayReceiver!: Mesh; // Plane for receiving ray
  private meshGroup!: Group; // Group for involving primitive meshes
  private interactor!: Interactor; // Interaction helper
  private meshTypeOption: TMeshTypeOption | null; // Mesh option
  private activeMesh: Voxel | undefined; // Active mesh

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.pixelRatio = window.devicePixelRatio;
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.aspect = this.width / this.height;
    this.meshTypeOption = null;
    this.activeMesh = undefined;

    this.init();
  }

  /**
   * Initialize
   */
  init() {
    this.initRenderer();
    this.initScene();
    this.initHierarchy();
    this.initController();
    this.initInteractor();
    this.initEventListeners();

    gsap.ticker.add(this.tick); // Sync rendering with gsap tick
  }

  /**
   * Initialize webgl renderer
   */
  initRenderer = () => {
    // WebGL renderer
    this.renderer = new WebGLRenderer({
      antialias: !(this.pixelRatio > 1),
      powerPreference: 'high-performance',
    });

    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
  };

  /**
   * Initialize scene
   */
  initScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0xf9f9fa);
  }

  /**
   * Initialize objects along with hierarchy
   */
  initHierarchy() {
    this.addCamera();
    this.addLights();
    this.addGrid();
    this.addRest();
    this.hierarchyUpdated();
  }

  /**
   * Initialize camera controller
   */
  initController() {
    this.controls = new OrbitControls(this.camera, this.container);

    // Change mouse button actions
    this.controls.mouseButtons = {
      LEFT: MOUSE.PAN,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,
    };
  }

  /**
   * Initialize interactor
   */
  initInteractor() {
    this.interactor = new Interactor(this.container, this.camera);

    this.interactor.add(this.rayReceiver);
  }

  /**
   * Initialize event listeners
   */
  initEventListeners = () => {
    window.addEventListener('resize', this.onWindowResize, false);
    dispatcher.addEventListener(Events.MESH_TYPE_UPDATED, this.onMeshTypeUpdated);
    dispatcher.addEventListener(Events.ADD_MESH, this.onAddMesh);
    dispatcher.addEventListener(Events.TRANSLATE_MESH, this.onTranslate);
    dispatcher.addEventListener(Events.ROTATE_MESH, this.onRotate);
    dispatcher.addEventListener(Events.REMOVE, this.onRemove);
  };

  /**
   * Dispose event listeners
   */
  disposeEventListeners = () => {
    window.removeEventListener('resize', this.onWindowResize, false);
    dispatcher.removeEventListener(Events.MESH_TYPE_UPDATED, this.onMeshTypeUpdated);
    dispatcher.removeEventListener(Events.ADD_MESH, this.onAddMesh);
    dispatcher.removeEventListener(Events.TRANSLATE_MESH, this.onTranslate);
    dispatcher.removeEventListener(Events.ROTATE_MESH, this.onRotate);
    dispatcher.removeEventListener(Events.REMOVE, this.onRemove);
  };

  /**
   * Add camera
   */
  addCamera() {
    this.camera = new PerspectiveCamera(45, this.aspect, 0.1, 1000);
    this.camera.position.set(0, 10, 0);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);
  }

  /**
   * Add lights
   */
  addLights() {
    const directLight = new DirectionalLight(0xffffff, 0.5);
    const ambientLight = new AmbientLight(0x404040);
    this.scene.add(directLight);
    this.scene.add(ambientLight);
  }

  /**
   * Add grid
   */
  addGrid() {
    this.gridHelper = new GridHelper(1000, 1000, 0xcccccc, 0xdddddd);
    this.scene.add(this.gridHelper);
  }

  /**
   * Add rest objects
   */
  addRest() {
    // Ray receiver
    const rayReceiverGeo = new PlaneBufferGeometry(1000, 1000);
    this.rayReceiver = new Mesh(rayReceiverGeo);
    this.rayReceiver.rotateX(-Math.PI / 2);
    this.rayReceiver.visible = false;
    this.rayReceiver.name = MESH_NAMES.RAY_RECEIVER;
    this.scene.add(this.rayReceiver);

    // Mesh group
    this.meshGroup = new Group();
    this.meshGroup.position.set(0, 0.5, 0);
    this.scene.add(this.meshGroup);
  }

  /**
   * Dispatch hierarchy updated event
   */
  hierarchyUpdated() {
    dispatcher.dispatchEvent({
      type: Events.HIERARCHY_UPDATED,
      scene: this.scene,
    });
  }

  /**
   * Resize event listener
   */
  onWindowResize = () => {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.aspect = this.width / this.height;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  };

  /**
   * Mesh type updated listener
   */
  onMeshTypeUpdated = (event: Event) => {
    this.meshTypeOption = event?.option;
  };

  /**
   * Add mesh listener
   */
  onAddMesh = (event: Event) => {
    if (!this.meshTypeOption) return;

    const intersectPoint = event?.intersect?.point?.toArray();

    const mesh = new Voxel(this.meshTypeOption, intersectPoint);

    this.meshGroup.add(mesh);
    this.activeMesh = mesh;
    this.hierarchyUpdated();
  };

  /**
   * Translate listener
   */
  onTranslate = (e: Event) => {
    this.activeMesh?.translate(this.camera.matrix, e?.direction);
  };

  /**
   * Rotate listener
   */
  onRotate = (e: Event) => {
    // this.activeMesh?.translate(this.camera.matrix, e?.direction);
  };

  /**
   * Remove listener
   */
  onRemove = (e: Event) => {
    const { removeAll } = e;

    // Remove all meshes, or active mesh
    if (removeAll) {
      for (let i = this.meshGroup.children.length - 1; i >= 0; i--) {
        const child = (this.meshGroup.children as Voxel[])[i];
        this.meshGroup.remove(child);
        child.dispose();
      }
    } else if (this.activeMesh) {
      this.meshGroup.remove(this.activeMesh);
      this.activeMesh.dispose();
      this.activeMesh = this.meshGroup.children[this.meshGroup.children.length - 1] as Voxel;
    }

    this.hierarchyUpdated();
  };

  /**
   * Render
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Tick
   */
  tick = () => {
    this.render();
    this.controls.update();
  };

  /**
   * Dispose
   */
  dispose() {
    gsap.ticker.remove(this.tick);
    this.disposeEventListeners();
    this.controls.dispose();
    (this.meshGroup.children as Voxel[]).forEach((child) => child.dispose());
  }
}

export * from './helpers';
