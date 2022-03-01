import { ThreeScene } from "./ThreeScene.js";
import { WasmOCC } from "../WasmOCC.js";
import { occObject3D } from "./occObject3D.js";






export class occApp {

    public world: ThreeScene;
    constructor() {
        this.world = new ThreeScene();
        this.MakeBottle(50, 70, 30);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('file').style.display = '';
    }



    public openBrep(BrepData:string)
    {
        this.world.clearObject();
        document.getElementById('loading').style.display = "";
        let topoShape= WasmOCC.readBrep(BrepData); 
        let obj = new occObject3D();
        obj.drawTopoShape(topoShape);
        this.world.objs.set(0,obj);
        this.world.scene.add(obj.mesh);
        document.getElementById('loading').style.display = 'none';
        this.world.setCamera();
    }

    public MakeBox(dx:number, dy:number,dz:number)
    {
        this.world.clearObject();
        let api_MakeBox = new WasmOCC.BRepPrimAPI_MakeBox(dx, dy, dz);
        let solid= api_MakeBox.Solid();
        let obj = new occObject3D();
        obj.drawTopoShape(solid);
        this.world.objs.set(0,obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }

    public MakeBottle(width:number, height:number,thickness:number)
    {
        let bottle = WasmOCC.MakeBottle(width, height, thickness);
        let obj = new occObject3D();
        obj.drawTopoShape(bottle);
        this.world.objs.set(0,obj);
        this.world.scene.add(obj.mesh);
        this.world.setCamera();
    }
}