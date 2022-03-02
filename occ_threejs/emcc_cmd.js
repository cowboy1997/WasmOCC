
var fs = require("fs")
var path = require("path")
var exec = require('child_process').exec;

//occ的inc目录
occInc_path ="../occ_src/inc";
//wasm接口的源文件目录
cppDir = "../occ_src/";
//occ编译的.a文件目录
libDir = "../occ_src/lib";
function searchFile(dir,fileType){
    var files=""
	var arr = fs.readdirSync(dir);
	arr.forEach(function(item){
		var fullpath = path.join(dir,item);
		var stats = fs.statSync(fullpath);
		if(stats.isDirectory()){
			searchFile(fullpath);
		}else{
            if( path.extname(fullpath)==fileType)
            {
                fullpath = fullpath.replace(/\\/g,"/");
                files += " " + fullpath
            }
		}
	});
	return files;
}

var lib_files = searchFile(libDir,".a");
var cpp_files = searchFile(cppDir,".cpp");
cmd = "emcc --bind" + cpp_files +lib_files +" -I" + occInc_path +" -o WasmOCC.js -s ALLOW_MEMORY_GROWTH=1 -O3"

console.log(cmd);
exec(cmd, function(error, stdout, stderr) {

    if(error) 
    {
        console.log(error);
    }
    else
    {
        fs.readFile("WasmOCC.js", "utf-8", function(error, data) {

            newContent= data.replace(/Module/g,"WasmOCC");
            newContent+= "\nexport {"+"WasmOCC"+"};"
            if (error)
            {
                console.log(error);
                return 
            } 
            fs.writeFile("WasmOCC.js", newContent, 'utf8', (err) => {
                if (err)
                {
                     console.log(err);
                     return 
                } 
                console.log('success');
            });
       
        });

    }
  });
