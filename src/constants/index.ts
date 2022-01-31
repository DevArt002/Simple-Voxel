import { TDropdownOption } from '@/Components';
import { EMesh, EColor } from '@/Types';

export const MESH_OPTIONS: TDropdownOption[] = [
  {
    color: EColor.RED,
    mesh: EMesh.BOX,
  },
  {
    color: EColor.GREEN,
    mesh: EMesh.CONE,
  },
  {
    color: EColor.BLUE,
    mesh: EMesh.Cylinder,
  },
  {
    color: EColor.YELLOW,
    mesh: EMesh.SPHERE,
  },
  {
    color: EColor.PINK,
    mesh: EMesh.DODECAHEDRON,
  },
];
