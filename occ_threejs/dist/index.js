import { ThreeScene } from "./ThreeScene.js";
import { WasmOCC } from "../WasmOCC.js";
import { occObject3D } from "./occObject3D.js";
export class occApp {
    constructor() {
        this.world = new ThreeScene();
        this.MakeBottle(50, 70, 30);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('file').style.display = '';
    }
    openBrep(BrepData) {
        this.world.clearObject();
        document.getElementById('loading').style.display = "";
        let topoShape = WasmOCC.readBrep(BrepData);
        let obj = new occObject3D();
        obj.drawTopoShape(topoShape);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
        document.getElementById('loading').style.display = 'none';
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