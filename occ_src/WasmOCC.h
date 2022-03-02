#pragma once
#include <TopoDS_Shape.hxx>
#include <vector>
namespace WasmOCC 
{
	class TriangleData
	{
	public:
		std::vector<float> vertexs;
		std::vector<float> normals;
		std::vector<float> uvs;
		std::vector<int> indices;
	};



	TopoDS_Shape MakeBottle(double myWidth, double myHeight, double myThickness);

	TriangleData* getTriangleData(TopoDS_Shape topoShape,double theLinDeflection,double theAngDeflection);

	TopoDS_Shape readBrep(std::string brepData);

	TopoDS_Shape readStep(std::string brepData);

	TopoDS_Shape readIges(std::string brepData);
}
