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

    let spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, Math.PI / 4, 0, 2);
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.position.set(-40, 30, 30);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const planeGeom = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMat = new THREE.MeshLambertMaterial({color: 0xabcdef});
    let plane = new THREE.Mesh(planeGeom, planeMat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    addGeometries(scene);
    document.getElementById('webgl-output').appendChilde(renderer.domElement);
    
    let step = 0;

    
    function addGeometries(scene) {
        let geoms = [];
        geoms.push(new THREE.CylinderGeometry(1, 4, 4));
        geoms.push(new THREE.BoxGeometry(2, 3, 4));
        geoms.push(new THREE.SphereGeometry(2));
        geoms.push(new THREE.IcosahedronGeometry(4));

        const points = [
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(2, 2, -2),
            new THREE.Vector3(2, -2, 2),
            new THREE.Vector3(2, -2, -2),
            new THREE.Vector3(-2, 2, 2),
            new THREE.Vector3(-2, 2, -2),
            new THREE.Vector3(-2, -2, 2),
            new THREE.Vector3(-2, -2, -2)];
        geoms.push(new THREE.ConvexGeometry(points));

        let pts = [];
        const detail = 0.1; // how many circle increments per half-circle rot.
        let radius = 3;
        for (let angle = 0.0; angle < Math.PI; angle += detail) {
            pts.push(
                new THREE.Vector3(
                    Math.cos(angle) * radius,
                    0,
                    Math.sin(angle) * radius));
        }
        geoms.push(new THREE.LatheGeometry(pts, 12));
        geoms.push(new THREE.OctahedronGeometry(3));
        geoms.push(
            new THREE.ParametricGeometry(
                THREE.ParametricGeometries.mobius3d, 20, 10));
        geoms.push(new THREE.TetrahedronGeometry(3));
        geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));
    }
}
