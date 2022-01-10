const W = window.innerWidth;
const H = window.innerHeight;


function init() {
    let scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // Ground plane
    const planeGeom = new THREE.PlaneGeometry(60, 20);
    const planeMat = new THREE.MeshLambertMaterial({color: 0xAAAAAA});
    let plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane)

    // Cube
    const cubeGeom = new THREE.BoxGeometry(4, 4, 4);
    const cubeMat = new THREE.MeshLambertMaterial({color: 0xFF0000});
    let cube = new THREE.Mesh(cubeGeom, cubeMat);
    cube.position.set(-4, 3, 0);
    cube.castShadow = true;
    scene.add(cube);

    // Sphere
    const sphereGeom = new THREE.SphereGeometry(4, 20, 20);
    const sphereMat = new THREE.MeshLambertMaterial({color: 0x7777FF});
    let sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.set(20, 4, 2);
    sphere.castShadow = true;
    scene.add(sphere);

    // Set camera
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // Spotlight
    let spotlight = new THREE.SpotLight(0xFFEECC);
    spotlight.position.set(-40, 40, -15);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotlight.shadow.camera.far = 130;
    spotlight.shadow.camera.near = 40;
    scene.add(spotlight);

    document.getElementById('webgl-output').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
