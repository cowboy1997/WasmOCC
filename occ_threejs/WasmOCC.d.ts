export namespace WasmOCC
{


	export class TopoDS_Shape
	{
		constructor();
		IsNull(): boolean;
	}
	export class TopoDS_Solid  extends TopoDS_Shape
	{
		constructor();
	}
	export class TopoDS_Shell  extends TopoDS_Shape
	{
		constructor();
	}
	export class TopoDS_Face  extends TopoDS_Shape
	{
		constructor();
	}

	export class BRepPrimAPI_MakeBox
	{
		constructor();
		constructor(dx:number,dy:number,dz:number);
		Solid():TopoDS_Solid;
		Shell():TopoDS_Shell;
		BottomFace():TopoDS_Face;
		BackFace():TopoDS_Face;
		FrontFace():TopoDS_Face;
		LeftFace():TopoDS_Face;
		RightFace():TopoDS_Face;
		TopFace():TopoDS_Face;
	}

	
	export class TriangleData
	{
		vertexs(): number[];
		normals(): number[];
		uvs(): number[];
		indices(): number[];
	}
	export function getTriangleData(Topo_Shape:TopoDS_Shape,theLinDeflection:number,theAngDeflection:number):TriangleData;
	export function MakeBottle(width:number, height:number,thickness:number): TopoDS_Shape;
	export function readBrep(data:string): TopoDS_Shape;
	export function readIges(data:string): TopoDS_Shape;
	export function readStep(data:string): TopoDS_Shape;

}