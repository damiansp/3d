const W = window.innerWidth;
const H = window.innerHeight;
let scene;
let camera;
let renderer;


function init() {
    window.addEventListener('resize', onResize, false);
    let stats = initStats();
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
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

    let step = 0;
    let controls = new function() {
        this.rotationSpeedX = 0.02;
        this.rotationSpeedY = 0.03;
        this.rotationSpeedZ = 0.05;
        this.bounceSpeed = 0.03;
    }
    
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeedX', 0, 0.5);
    gui.add(controls, 'rotationSpeedY', 0, 0.5);
    gui.add(controls, 'rotationSpeedZ', 0, 0.5);
    gui.add(controls, 'bounceSpeed', 0, 0.5);

    document.getElementById('webgl-output').appendChild(renderer.domElement);
    let trackballControls = initTrackballControls(camera, renderer);
    let clock = new THREE.Clock();
    renderScene();

    function onResize() {
        camera.aspect = W / H
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    }
        
    function renderScene() {
        trackballControls.update(clock.getDelta());
        stats.update();
        spinCube();
        bounceSphere();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    function spinCube() {
        cube.rotation.x += controls.rotationSpeedX;
        cube.rotation.y += controls.rotationSpeedY;
        cube.rotation.z += controls.rotationSpeedZ;
    }

    function bounceSphere() {
        sphere.position.x = 20 + 10*Math.cos(step);
        sphere.position.y = 2 + 10*Math.abs(Math.sin(step));
        step += controls.bounceSpeed;
    }
}
