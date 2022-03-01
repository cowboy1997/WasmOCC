import * as THREE from "../lib/threejs/three.module.js";
import { WasmOCC } from "../WasmOCC.js";
export class occObject3D {
    drawTopoShape(topoShape) {
        let triData = WasmOCC.getTriangleData(topoShape, 0.4, 0.4);
        this.topoShape = topoShape;
        let indices = triData.indices();
        let vertexs = triData.vertexs();
        let uvs = triData.uvs();
        let normals = triData.normals();
        let geometry = new THREE.BufferGeometry();
        this.mesh = new THREE.Mesh(geometry, occObject3D.modelMaterial);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertexs, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.setIndex(indices);
        return this;
    }
}
occObject3D.modelMaterial = new THREE.MeshPhongMaterial({
    color: 0x666666,
    specular: 0x444444,
    shininess: 20,
    side: THREE.DoubleSide,
});
//# sourceMappingURL=occObject3D.js.map