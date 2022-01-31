import { Material, Mesh, MeshStandardMaterial, Object3D, Texture } from 'three';

// Dispose texture
export const disposeTexture = (texture: Texture): void => {
  texture?.dispose();
};

// Dispose material
export const disposeMaterial = (material: Material | Material[]): void => {
  if (!material) return;

  let materialArr = [];

  if (Array.isArray(material)) {
    materialArr = material;
  } else {
    materialArr[0] = material;
  }

  materialArr.forEach((materialElement) => {
    const {
      alphaMap,
      displacementMap,
      emissiveMap,
      envMap,
      lightMap,
      map,
      bumpMap,
      aoMap,
      metalnessMap,
      roughnessMap,
      normalMap,
    } = materialElement as MeshStandardMaterial;

    alphaMap && disposeTexture(alphaMap);
    displacementMap && disposeTexture(displacementMap);
    emissiveMap && disposeTexture(emissiveMap);
    envMap && disposeTexture(envMap);
    lightMap && disposeTexture(lightMap);
    map && disposeTexture(map);
    bumpMap && disposeTexture(bumpMap);
    aoMap && disposeTexture(aoMap);
    metalnessMap && disposeTexture(metalnessMap);
    roughnessMap && disposeTexture(roughnessMap);
    normalMap && disposeTexture(normalMap);
    materialElement?.dispose();
  });
};

// Dispose object
export const disposeObject = (object: Object3D): void => {
  if (!object) return;

  object.traverse((child) => {
    if ((<Mesh>child).isMesh) {
      const { geometry, material } = child as Mesh;

      geometry?.dispose();
      disposeMaterial(material);
    }
  });
};
