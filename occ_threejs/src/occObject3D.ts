import * as THREE from "../lib/threejs/three.module.js";
import { WasmOCC } from "../WasmOCC.js";


export class occObject3D {
    public static modelMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666,
        specular: 0x444444,//高光部分的颜色
        shininess: 20,//高光部分的亮度，默认30
        side: THREE.DoubleSide,
    });


    public mesh: THREE.Mesh;

    public topoShape: WasmOCC.TopoDS_Shape;

    public drawTopoShape(topoShape: WasmOCC.TopoDS_Shape): occObject3D {
        let triData = WasmOCC.getTriangleData(topoShape, 0.4, 0.4);
        this.topoShape=topoShape;
        let indices: number[] = triData.indices();
        let vertexs: number[] = triData.vertexs();
        let uvs: number[] = triData.uvs();
        let normals: number[] = triData.normals();
        let geometry = new THREE.BufferGeometry();
        this.mesh = new THREE.Mesh(geometry, occObject3D.modelMaterial);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertexs, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.setIndex(indices);
        return this;
    }









}