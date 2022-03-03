import { ThreeScene } from "./ThreeScene.js";
import { WasmOCC } from "../WasmOCC.js";
import { occObject3D } from "./occObject3D.js";
import { GUI } from '../lib/threejs/dat.gui.module.js';
export class occApp {
    constructor() {
        this.width = 50;
        this.height = 70;
        this.thickness = 30;
        this.world = new ThreeScene();
        this.MakeBottle(50, 70, 30);
        this.createPanel();
        this.world.setCamera();
    }
    createPanel() {
        let settings = {
            'width': this.width,
            'height': this.height,
            'thickness': this.thickness,
        };
        let scope = this;
        let panel = new GUI({ width: 310 });
        panel.add(settings, "width", 1, 100, 1).listen().onChange(function (data) {
            scope.width = data;
            scope.MakeBottle(scope.width, scope.height, scope.thickness);
        });
        panel.add(settings, "height", 1, 100, 1).listen().onChange(function (data) {
            scope.height = data;
            scope.MakeBottle(scope.width, scope.height, scope.thickness);
        });
        panel.add(settings, "thickness", 1, 100, 1).listen().onChange(function (data) {
            scope.thickness = data;
            scope.MakeBottle(scope.width, scope.height, scope.thickness);
        });
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
        this.world.clearObject();
        let bottle = WasmOCC.MakeBottle(width, height, thickness);
        let obj = new occObject3D();
        obj.drawTopoShape(bottle);
        this.world.objs.set(0, obj);
        this.world.scene.add(obj.mesh);
    }
}
//# sourceMappingURL=index.js.map
