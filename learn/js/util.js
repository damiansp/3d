function initStats(type) {
    const panelType = ((typeof type !== 'undefined' && type) && (!isNaN(type))
                       ? parseInt(type)
                       : 0);
    let stats = new Stats();
    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb 3+: custom               
    document.body.appendChild(stats.dom);
    return stats
}


function initTrackballControls(camera, renderer) {
    let trackballControls = new THREE.TrackballControls(
        camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];
    return trackballControls;
}
