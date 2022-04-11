const W = window.innerWidht;
const H = window.innerHeight;


function init() {
    let stats = initStats();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookat(new THREE.Vector3(5, 0, 0));
    
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

    const ambientLight = new THREE.AmbientLight(0x494949);
    scene.add(ambientLight);

    document.getElementById('webgl-output').appendChilde(renderer.domElement);

    let step = 0;
    let vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)];
    let faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 3)];
    let geom = new THREE.Geometry();
    gem.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    let materials = [
        new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
        new THREE.MeshLambertMaterial(
            {opacity: 0.6, color: 0x44ff44, transparent: true})];
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.castShadow = true;
    mesh.children.foreact(function(e) { e.castShadow = true });
    scene.add(mesh);

    let spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.mapSize.width = 2048;
}
