const W = window.innerWidth;
const H = window.innerHeight;


function init() {
    let scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(W, H);

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // Ground plane
    const planeGeom = new THREE.PlaneGeometry(60, 20);
    const planeMat = new THREE.MeshBasicMaterial({color: 0xAAAAAA});
    let plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane)

    // Cube
    const cubeGeom = new THREE.BoxGeometry(4, 4, 4);
    const cubeMat = new THREE.MeshBasicMaterial({color: 0xFF0000,
                                                  wireframe: true});
    let cube = new THREE.Mesh(cubeGeom, cubeMat);
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    // Sphere
    const sphereGeom = new THREE.SphereGeometry(4, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({color: 0x7777FF,
                                                   wireframe: true});
    let sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    // Set camera
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    document.getElementById('webgl-output').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
