import {
    BoxBufferGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer } from 'three';



// Scene
const container = document.querySelector('#scene-container');
const H = container.clientHeight;
const W = container.clientWidth;
const scene = new Scene();
scene.background = new Color('skyblue');

// Camera
const fov = 35; // field of view
const aspect = W / H;
const near = 0.1;
const far = 100;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);

// Cube
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshBasicMaterial();
const cube = new Mesh(geometry, material);
scene.add(cube);

// Renderer
const renderer = new WebGLRenderer();
renderer.setSize(W, H);
renderer.setPixelRatio(windo.devicePixelRatio);
container.append(renderer.domElement);
renderer.render(scene, camera);
  
