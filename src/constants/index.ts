import { EMeshType, EColor, TMeshTypeOption } from '@/Types';

export const MESH_TYPE_OPTIONS: TMeshTypeOption[] = [
  {
    color: EColor.RED,
    mesh: EMeshType.BOX,
  },
  {
    color: EColor.GREEN,
    mesh: EMeshType.CONE,
  },
  {
    color: EColor.BLUE,
    mesh: EMeshType.Cylinder,
  },
  {
    color: EColor.YELLOW,
    mesh: EMeshType.SPHERE,
  },
  {
    color: EColor.PINK,
    mesh: EMeshType.DODECAHEDRON,
  },
];

export enum MESH_NAMES {
  RAY_RECEIVER = 'rayReceiver',
}
