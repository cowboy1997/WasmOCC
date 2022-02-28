#pragma once
#include <vector>
namespace WasmOCC {
	class TriangleData
	{
	public:
		std::vector<float> vertexs;
		std::vector<float> normals;
		std::vector<float> uvs;
		std::vector<int> indices;
	};
}

