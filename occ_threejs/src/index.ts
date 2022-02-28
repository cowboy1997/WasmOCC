import { ThreeScene } from "./ThreeScene.js";
import { WasmOCC } from "../WasmOCC.js";
import { occObject3D } from "./occObject3D.js";






export class occApp {

    public world: ThreeScene;
    constructor() {
        this.world = new ThreeScene();
        this.MakeBottle(50, 70, 30);
        //this.MakeBox(50, 70, 30);
        document.getElementById('loading').style.display = 'none';
    }

    public MakeBox(dx:number, dy:number,dz:number)
    {
        let api_MakeBox = new WasmOCC.BRepPrimAPI_MakeBox(dx, dy, dz);
        let solid= api_MakeBox.Solid();
        let bottleObj = new occObject3D();
        bottleObj.drawTopoShape(solid);
        this.world.scene.add(bottleObj.mesh);
        this.world.setCamera();
    }

    public MakeBottle(width:number, height:number,thickness:number)
    {
        let bottle = WasmOCC.MakeBottle(width, height, thickness);
        let bottleObj = new occObject3D();
        bottleObj.drawTopoShape(bottle);
        this.world.scene.add(bottleObj.mesh);
        this.world.setCamera();
    }
}