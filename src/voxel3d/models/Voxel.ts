import {
  Mesh,
  Color,
  MeshLambertMaterial,
  BoxGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  SphereBufferGeometry,
  DodecahedronBufferGeometry,
} from 'three';
// Types
import { EMeshType, TMeshTypeOption } from '@/Types';

export class Voxel extends Mesh {
  private option: TMeshTypeOption;
  private initPos: number[];

  constructor(option: TMeshTypeOption, initPos: number[] = [0, 0, 0]) {
    super();

    this.option = option;
    this.initPos = initPos;

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
}
