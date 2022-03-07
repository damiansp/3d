const W = window.innerWidth;
const H = window.innerHeight;


function init() {
    let stats = initStats();
    let scene = new THREE.Scene();
    const center = new THREE.Vector3(-10, 0, 0);

    let camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(center);

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0x556644);
    scene.add(ambientLight);

    const planeGeom = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMat = new THREE.MeshLambertMaterial({color: 0xabcdef});
    let plane = new THREE.Mesh(planeGeom, planeMat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.ad(plane);

}
