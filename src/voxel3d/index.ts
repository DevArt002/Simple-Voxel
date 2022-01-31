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
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
// Utils
import { dispatcher, Events } from './helpers';

export default class Voxel3D {
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

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.pixelRatio = window.devicePixelRatio;
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.aspect = this.width / this.height;

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
   * Initialize event listeners
   */
  initEventListeners = () => {
    window.addEventListener('resize', this.onWindowResize, false);
  };

  /**
   * Dispose event listeners
   */
  disposeEventListeners = () => {
    window.removeEventListener('resize', this.onWindowResize, false);
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
    this.scene.add(this.rayReceiver);

    // Mesh group
    this.meshGroup = new Group();
    this.meshGroup.position.set(0, 0.5, 0);
    this.scene.add(this.meshGroup);
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
   * Dispatch hierarchy updated event
   */
  hierarchyUpdated() {
    dispatcher.dispatchEvent({
      type: Events.HIERARCHY_UPDATE,
      scene: this.scene,
    });
  }

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
  }
}

export * from './helpers';
