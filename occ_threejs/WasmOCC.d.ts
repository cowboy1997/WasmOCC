export namespace WasmOCC
{


	class TopoDS_Shape
	{
		constructor();
		IsNull(): boolean;
	}
	class TopoDS_Solid  extends TopoDS_Shape
	{
		constructor();
	}
	class TopoDS_Shell  extends TopoDS_Shape
	{
		constructor();
	}
	class TopoDS_Face  extends TopoDS_Shape
	{
		constructor();
	}

	class BRepPrimAPI_MakeBox
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

	
	class TriangleData
	{
		vertexs(): number[];
		normals(): number[];
		uvs(): number[];
		indices(): number[];
	}
	function getTriangleData(Topo_Shape:TopoDS_Shape,theLinDeflection:number,theAngDeflection:number):TriangleData;
	function MakeBottle(width:number, height:number,thickness:number): TopoDS_Shape;
	function readBrep(BrepData:string): TopoDS_Shape;

}