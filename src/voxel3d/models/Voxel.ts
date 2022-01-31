import {
  Mesh,
  Color,
  MeshLambertMaterial,
  BoxGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  SphereBufferGeometry,
  DodecahedronBufferGeometry,
  Vector3,
  Matrix4,
  Quaternion,
} from 'three';
// Helpers
import { disposeObject } from '@/Voxel3D/helpers';
// Types
import { EMeshType, ETransDir, TVelDir, TMeshTypeOption, ERotDir } from '@/Types';

export class Voxel extends Mesh {
  private option: TMeshTypeOption; // Mesh options involving mesh type and color
  private initPos: number[]; // Initial position
  private initTransDirs: TVelDir; // Initial velocity direction
  private initRotAxis: Vector3; // Initial rotation axis
  private initTransVel: number; // Initial velocity scalar
  private initRotVel: number; // Initial velocity scalar

  constructor(option: TMeshTypeOption, initPos: number[] = [0, 0, 0]) {
    super();

    this.option = option;
    this.initPos = initPos;
    this.initTransDirs = {
      [ETransDir.UP]: new Vector3(0, 1, 0),
      [ETransDir.DOWN]: new Vector3(0, -1, 0),
      [ETransDir.LEFT]: new Vector3(-1, 0, 0),
      [ETransDir.RIGHT]: new Vector3(1, 0, 0),
    };
    this.initRotAxis = new Vector3(0, 0, 1);
    this.initTransVel = 0.01;
    this.initRotVel = Math.PI / 180; // 1 degree

    this.init();
  }

  /**
   * Initialize
   */
  init() {
    const { mesh: meshType, color: meshColor } = this.option;

    switch (meshType) {
      case EMeshType.CONE:
        this.geometry = new ConeBufferGeometry(0.5, 1, 32);
        break;
      case EMeshType.Cylinder:
        this.geometry = new CylinderBufferGeometry(0.5, 0.5, 1, 32);
        break;
      case EMeshType.SPHERE:
        this.geometry = new SphereBufferGeometry(0.5, 32, 16);
        break;
      case EMeshType.DODECAHEDRON:
        this.geometry = new DodecahedronBufferGeometry(0.5);
        break;
      default:
        this.geometry = new BoxGeometry(1, 1, 1);
        break;
    }
    this.material = new MeshLambertMaterial({ color: new Color(meshColor) });
    this.position.fromArray(this.initPos);
  }

  /**
   * Translate mesh
   */
  translate = (matrix: Matrix4, direction?: ETransDir) => {
    if (!direction) return;

    const quaternion = new Quaternion().setFromRotationMatrix(matrix);
    const velDir = this.initTransDirs[direction].clone().applyQuaternion(quaternion);
    const vel = velDir.multiplyScalar(this.initTransVel);

    this.position.add(vel);
  };

  /**
   * Rotate mesh
   */
  rotate = (matrix: Matrix4, direction?: ERotDir) => {
    if (!direction) return;

    const quaternion = new Quaternion().setFromRotationMatrix(matrix);
    const axis = this.initRotAxis.clone().applyQuaternion(quaternion);

    this.rotateOnAxis(axis, direction === ERotDir.LEFT ? this.initRotVel : -this.initRotVel);
  };

  /**
   * Dispose
   */
  dispose() {
    disposeObject(this);
  }
}
