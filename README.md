# WasmOCC
这个一个occ编译wasm的简单例子，在web中计算并渲染出occ中瓶子的例子。
occ的WebAssembly实现，用了threejs渲染，threejs中用到的occ相关的方法已经编译封装好了，如果需要添加新的方法请修改occ_src文件夹下的c++代码，具体方法可以查看我写的博客https://blog.csdn.net/qq_35187495/article/details/123172849

项目的demo预览https://cowboy1997.github.io/WasmOCC/occ_threejs 

1、对occ的编译可以occ_threejs文件下运行emcc_cmd.py文件,在此前提需要先修改emcc_cmd.py文件中的相关路径。

2、对ts的编译可以occ_threejs文件夹下运行tsc进行编译。

3、启动一个服务打开index.html

