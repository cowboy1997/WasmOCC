import { ThreeScene } from "./ThreeScene.js";
import { WasmOCC } from "../WasmOCC.js";
import { occObject3D } from "./occObject3D.js";
export class occApp {
    constructor() {
        this.world = new ThreeScene();
        //this.MakeBottle(50, 70, 30);
    }
    readStep(data) {
        this.world.clearObject();
        let topoShape = WasmOCC.readStep(data);
        let obj = new occObject3D();
        obj.drawTopoShape(topoShape);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
    readBrep(data) {
        this.world.clearObject();
        let topoShape = WasmOCC.readBrep(data);
        let obj = new occObject3D();
        obj.drawTopoShape(topoShape);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
    readIges(data) {
        this.world.clearObject();
        let topoShape = WasmOCC.readIges(data);
        let obj = new occObject3D();
        obj.drawTopoShape(topoShape);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
    MakeBox(dx, dy, dz) {
        this.world.clearObject();
        let api_MakeBox = new WasmOCC.BRepPrimAPI_MakeBox(dx, dy, dz);
        let solid = api_MakeBox.Solid();
        let obj = new occObject3D();
        obj.drawTopoShape(solid);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
    MakeBottle(width, height, thickness) {
        let bottle = WasmOCC.MakeBottle(width, height, thickness);
        let obj = new occObject3D();
        obj.drawTopoShape(bottle);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
}
//# sourceMappingURL=index.js.map
