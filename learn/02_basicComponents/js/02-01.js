const W = window.innerWidth;
const H = window.innerHeight;


function init() {
    let stats = initStats()
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;

    const planeGeom = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMat = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeom, planeMat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0x3c3c3c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    let step = 0;

    let controls = new function() {
        this.rotationSpeed = 0.02;
        this.nObjects = scene.children.length
        
        this.removeCube = function() {
            let allChildren = scene.children;
            let lastObj = allChildren[allChildren.length - 1];
            if (lastObj instanceof THREE.Mesh) {
                scene.remove(lastObj);
                this.nObjects = scene.children.length;
            }
        };
        
        this.addCube = function() {
            const cubeSize = Math.ceil((Math.random() * 6));
            const cubeGeom = new THREE.BoxGeometry(
                cubeSize, cubeSize, cubeSize);
            const cubeMat = new THREE.MeshLambertMaterial(
                {color: Math.random() * 0xffffff});
            let cube = new THREE.Mesh(cubeGeom, cubeMat);
            cube.castShadow = true;
            cube.name = 'cube-' + scene.children.length;
            cube.position.x = (
                -30
                + Math.round(Math.random() * planeGeom.parameters.width));
            cube.position.y = Math.round(Math.random() * 5);
            cube.position.z = (
                -20
                + Math.round(Math.random() * planeGeom.parameters.height));
            scene.add(cube);
            this.nObjectse = scene.children.length;
        };
        
        this.outputObjects = function() {
            console.log(scene.children);
        };
    };
    
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'nObjects').listen();

    let trackballControls = initTrackballControls(camera, renderer);
    let clock = new THREE.Clock();

    render();

    function render() {
        trackballControls.update(clock.getDelta());
        stats.update();
        // rotate cubes
        scene.traverse(function(e) {
            if (e instanceof THREE.Mesh && e != plane) {
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        });
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    scene.fog = new THREE.Fog(0xddddff, 0.015, 100); // color, near, far
    //scene.fog = new THREE.FogExp2(0xccffdd, 0.01); // color, density
}
