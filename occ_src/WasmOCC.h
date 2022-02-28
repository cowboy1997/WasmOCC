#pragma once

#include "TriangleData.h"
#include <TopoDS_Shape.hxx>
namespace WasmOCC 
{

	TopoDS_Shape MakeBottle(double myWidth, double myHeight, double myThickness);

	TriangleData* getTriangleData(TopoDS_Shape topoShape,double theLinDeflection,double theAngDeflection);
}
