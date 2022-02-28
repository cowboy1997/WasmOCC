#include "WasmOCC.h"
#include "TriangleData.h"
#include <BRepPrimAPI_MakeBox.hxx>
#include <TopoDS_Solid.hxx>
#include <TopoDS_Shell.hxx>
#include <TopoDS_Face.hxx>
#include <emscripten/bind.h>
#include <emscripten/val.h>


#define EMBIND_LAMBDA(retval, arglist, impl) (retval (*) arglist) [] arglist impl
EMSCRIPTEN_BINDINGS(my_module) {
	emscripten::class_<TopoDS_Shape>("TopoDS_Shape")
	    .constructor()
		.function("IsNull", &TopoDS_Shape::IsNull);;
	emscripten::class_<TopoDS_Solid,emscripten::base<TopoDS_Shape>>("TopoDS_Solid")
	    .constructor();
	emscripten::class_<TopoDS_Shell,emscripten::base<TopoDS_Shape>>("TopoDS_Shell")
	    .constructor();
	emscripten::class_<TopoDS_Face,emscripten::base<TopoDS_Shape>>("TopoDS_Face")
	    .constructor();
	emscripten::class_<BRepPrimAPI_MakeBox>("BRepPrimAPI_MakeBox")
	    .constructor()
		.constructor<double, double, double>()
		.function("Solid", &BRepPrimAPI_MakeBox::Solid)
		.function("Shell", &BRepPrimAPI_MakeBox::Shell)
		.function("BottomFace", &BRepPrimAPI_MakeBox::BottomFace)
		.function("BackFace", &BRepPrimAPI_MakeBox::BackFace)
		.function("FrontFace", &BRepPrimAPI_MakeBox::FrontFace)
		.function("LeftFace", &BRepPrimAPI_MakeBox::LeftFace)
		.function("RightFace", &BRepPrimAPI_MakeBox::RightFace)
		.function("TopFace", &BRepPrimAPI_MakeBox::TopFace);



	emscripten::class_<WasmOCC::TriangleData>("TriangleData")
		.function("vertexs", EMBIND_LAMBDA(emscripten::val, (WasmOCC::TriangleData* triData), {
			 std::vector<float> c_datas = triData->vertexs;
	         emscripten::val js_Datas = emscripten::val::array();
			 for (int i = 0; i < c_datas.size(); i++)
			 {
				 js_Datas.set(i, c_datas[i]);
			 }
			 return js_Datas;
		}), emscripten::allow_raw_pointers())
		.function("normals", EMBIND_LAMBDA(emscripten::val, (WasmOCC::TriangleData* triData), {
			 std::vector<float> c_datas = triData->normals;
	         emscripten::val js_Datas = emscripten::val::array();
			 for (int i = 0; i < c_datas.size(); i++)
			 {
				 js_Datas.set(i, c_datas[i]);
			 }
			 return js_Datas;
		}), emscripten::allow_raw_pointers())
		.function("uvs", EMBIND_LAMBDA(emscripten::val, (WasmOCC::TriangleData* triData), {
			 std::vector<float> c_datas = triData->uvs;
	         emscripten::val js_Datas = emscripten::val::array();
			 for (int i = 0; i < c_datas.size(); i++)
			 {
				 js_Datas.set(i, c_datas[i]);
			 }
			 return js_Datas;
		}), emscripten::allow_raw_pointers())
		.function("indices", EMBIND_LAMBDA(emscripten::val, (WasmOCC::TriangleData* triData), {
			 std::vector<int> c_datas = triData->indices;
	         emscripten::val js_Datas = emscripten::val::array();
			 for (int i = 0; i < c_datas.size(); i++)
			 {
				 js_Datas.set(i, c_datas[i]);
			 }
			 return js_Datas;
		}), emscripten::allow_raw_pointers());
	
	emscripten::function("getTriangleData", &WasmOCC::getTriangleData, emscripten::allow_raw_pointers());
	emscripten::function("MakeBottle", &WasmOCC::MakeBottle, emscripten::allow_raw_pointers());
}
