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

        this.addCube = function() {};
    }
}
