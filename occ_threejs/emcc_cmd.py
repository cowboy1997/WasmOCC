
import sys,os
import subprocess

#occ的inc目录
occInc_path ="../occ_src/inc"
#wasm接口的源文件目录
cppDir = "../occ_src/"
#occ编译的.a文件目录
libDir = "../occ_src/lib"
def emcc_cmd():
	cpp_files = ""
	for root, dirs, files in os.walk(cppDir):
		for file in files:
			if file.find(".cpp") >= 0:
				fileName = os.path.join(root, file)
				fileName = fileName.replace("\\", "/")
				cpp_files += " " + fileName
	lib_files = ""
	for root, dirs, files in os.walk(libDir):
		for file in files:
			if file.find(".a") >= 0:
				fileName = os.path.join(root, file)
				fileName = fileName.replace("\\", "/")
				lib_files += " " + fileName

	cmd_str = "emcc -O3 --bind" + cpp_files +lib_files +" -I" + occInc_path +" -o WasmOCC.js -s ALLOW_MEMORY_GROWTH=1"
	p = subprocess.Popen(cmd_str, shell=True)
	p.communicate()


def replaceModuleName():
	path = sys.path[0]
	js_filename = os.path.join(path,"WasmOCC.js")
	lines = []
	with open(js_filename) as f:
		lines = f.readlines()
		f.close()
	jsText = ""
	for line in lines:
		line = line.replace("Module","WasmOCC")
		jsText += line
	if len(jsText) > 0:
		jsText += "\nexport {"+"WasmOCC"+"};"
		with open(js_filename,"w") as f:
			f.write(jsText)
			f.close()
			print("Done!")
	else:
		print("Failed!")

emcc_cmd()
replaceModuleName()
