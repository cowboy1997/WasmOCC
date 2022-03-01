import * as THREE from "../lib/threejs/three.module.js";
import { OrbitControls } from '../lib/threejs/controls/OrbitControls.js';
export class ThreeScene {
    constructor() {
        this.onWindowResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.animate = () => {
            requestAnimationFrame(this.animate);
            this.render();
            this.controls.update();
        };
        this.objs = new Map();
        this.init();
    }
    init() {
        this.initScene();
        this.initRenderer();
        this.initCamera();
        this.initLight();
        this.initControls();
        window.addEventListener('resize', this.onWindowResize, false);
        this.animate();
        this.setCamera();
    }
    /**
     * 场景
     */
    initScene() {
        this.scene = new THREE.Scene();
        //背景颜色
        this.scene.background = new THREE.Color(0xbbbbbb);
        let axes = new THREE.AxesHelper(10);
        //axes.rotation.set(Math.PI / 2.0,0,0);
        this.scene.add(axes);
        let grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff);
        grid.rotation.set(Math.PI / 2.0, 0, 0);
        grid.material.opacity = 0.5;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        this.scene.add(grid);
    }
    /**
     *  初始化相机
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 50, 100);
        this.camera.up = new THREE.Vector3(0, 0, 1);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    /**
     *  初始渲染器
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.shadowMap.enabled = true;
        //renderer.setClearColor(0xdddddd);
        document.body.appendChild(this.renderer.domElement);
    }
    initLight() {
        //添加环境光
        //第一个参数 Hex:光的颜色 
        //第二个参数 Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        //scene.add(new THREE.AmbientLight(0x5C5C5C));
        let light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(0.5, 0, 0.866); // ~60º
        light.castShadow = true;
        this.scene.add(light); //追加光源到场景
        let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(-0.5, 0, -0.866); // ~60º
        light2.castShadow = true;
        this.scene.add(light2); //追加光源到场景
    }
    /**
     * 控制器
     */
    initControls() {
        //初始化轨迹球控件
        //this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        this.controls.dampingFactor = 0.5;
        //是否可以缩放
        this.controls.enableZoom = true;
        //是否自动旋转
        this.controls.autoRotate = false;
        //设置相机距离原点的最近距离
        //controls.minDistance = 50;
        //设置相机距离原点的最远距离
        //controls.maxDistance = 200;
        //是否开启右键拖拽
        this.controls.enablePan = true;
    }
    /**
     * 渲染
     */
    render() {
        //设置主场景视区大小
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }
    /**
     * //设置模型到适合观察的大小
     */
    setCamera() {
        try {
            //计算包围盒
            var boxHelper = new THREE.BoxHelper(this.scene);
            boxHelper.geometry.computeBoundingBox();
            let radius = boxHelper.geometry.boundingSphere.radius;
            //计算相机位置
            let box = boxHelper.geometry.boundingBox;
            let center = new THREE.Vector3((box.max.x + box.min.x) / 2, (box.max.y + box.min.y) / 2, (box.max.z + box.min.z) / 2);
            let cameraPos = new THREE.Vector3(center.x, center.y - radius, center.z + (box.max.z - box.min.z));
            this.camera.lookAt(center);
            this.camera.position.copy(cameraPos);
            this.controls.target = center;
        }
        catch (_a) {
        }
        this.controls.update();
    }
    clearObject() {
        for (let obj of this.objs.values()) {
            this.scene.remove(obj.mesh);
            obj.topoShape["delete"]();
        }
    }
}
//# sourceMappingURL=ThreeScene.js.map