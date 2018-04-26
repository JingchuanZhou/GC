    
    document.getElementById("front").onclick = function() {
        frontCamera();
    }
    document.getElementById("up").onclick = function() {
        upCamera();
    }
    document.getElementById("left").onclick = function() {
        leftCamera();
    }
    document.getElementById("isometric").onclick = function() {
        isometricCamera();
    }
    document.getElementById("dimetric").onclick = function() {
        dimetricCamera();
    }
    document.getElementById("trimetric").onclick = function() {
        trimetricCamera();
    }
    document.getElementById("onepoint").onclick = function() {
        onepointCamera();
    }
    document.getElementById("twopoint").onclick = function() {
        twopointCamera();
    }
    document.getElementById("threepoint").onclick = function() {
        threepointCamera();
    }
    document.getElementById("changetexture").onclick = function() {
        changeTexture();
    }
    var renderer;
    function initRender() {
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        //Shadowing
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; THREE.PCFShadowMap
        document.body.appendChild(renderer.domElement);
    }

    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 40, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    function frontCamera() {
        camera.position.set(0,30,100);
    }
    function upCamera() {
        camera.position.set(0,100,0);
    }
    function leftCamera() {
        camera.position.set(100,30,0);
    }
    function isometricCamera() {
        camera.position.set(100,130,100);
    }
    function dimetricCamera() {
        camera.position.set(100,80,100);
    }
    function trimetricCamera() {
        camera.position.set(100,180,100);
    }
    function onepointCamera() {
        camera.position.set(100,30,0);
    }
    function twopointCamera() {
        camera.position.set(100,30,100);
    }
    function threepointCamera() {
        camera.position.set(100,230,100);
    }
    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }
    function changeTexture(){
        
    }

    var texmc =0 ;

    //init
    var gui;
    function initGui() {
        //inti
        gui = {
            lightY: 30, //light y
            cubeX: 0, //cube x
            cubeY: 30, //cube y
            cubeZ: 0 //cube z
        };
        var datGui = new dat.GUI();
        
        datGui.add(gui, "lightY", 0, 100);
        datGui.add(gui, "cubeX", -30, 30);
        datGui.add(gui, "cubeY", -30, 30);
        datGui.add(gui, "cubeZ", -30, 30);
    }

    var light;
    function initLight() {
        scene.add(new THREE.AmbientLight(0x444444));

        light = new THREE.PointLight(0xffffff);
        light.position.set(80, 80, 100);

        //shadow
        light.castShadow = true;

        scene.add(light);
    }

    var cube;
    function initModel() {

        //helper
        var helper = new THREE.AxisHelper(10);
        scene.add(helper);


        //cube
        var cubeGeometry = new THREE.Geometry();

        //set nodes
        var vertices = [
            new THREE.Vector3(10, 10, 10), //v0
            new THREE.Vector3(-10, 10, 10), //v1
            new THREE.Vector3(-10, -10, 10), //v2
            new THREE.Vector3(10, -10, 10), //v3
            new THREE.Vector3(10, -10, -10), //v4
            new THREE.Vector3(10, 10, -10), //v5
            new THREE.Vector3(-10, 10, -10), //v6
            new THREE.Vector3(-10, -10, -10) //v7
        ];

        cubeGeometry.vertices = vertices;

        //set face
        var faces=[
            new THREE.Face3(0,1,2),
            new THREE.Face3(0,2,3),
            new THREE.Face3(0,3,4),
            new THREE.Face3(0,4,5),
            new THREE.Face3(1,6,7),
            new THREE.Face3(1,7,2),
            new THREE.Face3(6,5,4),
            new THREE.Face3(6,4,7),
            new THREE.Face3(5,6,1),
            new THREE.Face3(5,1,0),
            new THREE.Face3(3,2,7),
            new THREE.Face3(3,7,4)
        ];

        cubeGeometry.faces = faces;

        //generate vactor
        cubeGeometry.computeFaceNormals();

        cubeGeometry = new THREE.BoxBufferGeometry( 30 , 30, 30 );
        var texture1 = THREE.ImageUtils.loadTexture("img/1.png");
        var texture2= THREE.ImageUtils.loadTexture("img/2.png");
        var texture3 = THREE.ImageUtils.loadTexture("img/3.png");
        var texture4= THREE.ImageUtils.loadTexture("img/4.png");
        var texture5 = THREE.ImageUtils.loadTexture("img/5.png");
        var texture6 = THREE.ImageUtils.loadTexture("img/6.png");
        var texture11 = THREE.ImageUtils.loadTexture("img/mc2.jpg");
        var texture22 = THREE.ImageUtils.loadTexture("img/mc2.jpg");
        var texture33 = THREE.ImageUtils.loadTexture("img/mc3.jpg");
        var texture44 = THREE.ImageUtils.loadTexture("img/mc1.jpg");
        var texture55 = THREE.ImageUtils.loadTexture("img/mc2.jpg");
        var texture66 = THREE.ImageUtils.loadTexture("img/mc2.jpg");
        var materialArr1=[
        //6face texture
        new THREE.MeshPhongMaterial({map:texture1}),
        new THREE.MeshPhongMaterial({map:texture2}),
        new THREE.MeshPhongMaterial({map:texture3}),
        new THREE.MeshPhongMaterial({map:texture4}),
        new THREE.MeshPhongMaterial({map:texture5}),
        new THREE.MeshPhongMaterial({map:texture6})
        ];
        var materialArr2=[
        //6face texture
        new THREE.MeshPhongMaterial({map:texture11}),
        new THREE.MeshPhongMaterial({map:texture22}),
        new THREE.MeshPhongMaterial({map:texture33}),
        new THREE.MeshPhongMaterial({map:texture44}),
        new THREE.MeshPhongMaterial({map:texture55}),
        new THREE.MeshPhongMaterial({map:texture66})
        ];

        if(texmc=1){
        var facematerial=new THREE.MeshFaceMaterial(materialArr2);
        }
        else {
        var facematerial=new THREE.MeshFaceMaterial(materialArr1);
        }

        // var texture = new THREE.TextureLoader().load( '1.png' );

        // var cubeMaterial = new THREE.MeshLambertMaterial( { map: texture });

        cube = new THREE.Mesh(cubeGeometry, facematerial);
        cube.position.x = 30;
        cube.position.y = 50;
        cube.position.z = 30;

        //shadow
        cube.castShadow = true;

        scene.add(cube);

        //bottom plane
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -0;

        //bottom shadow
        plane.receiveShadow = true;

        scene.add(plane);

    }

    //inti stats
    var stats;
    function initStats() {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    //inti control
    var controls;
    function initControls() {

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.autoRotate = false;
        controls.minDistance = 50;
        controls.maxDistance = 200;
        controls.enablePan = true;
    }

    function render() {
        renderer.render(scene, camera);
    }

    //resize
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        render();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }



    function animate() {
        //update
        render();

        stats.update();

        light.position.y = gui.lightY;
        cube.position.x = gui.cubeX;
        cube.position.y = gui.cubeY;
        cube.position.z = gui.cubeZ;

        controls.update();

        requestAnimationFrame(animate);
    }

    function draw() {
        initGui();
        initRender();
        initScene();
        initCamera();
        initLight();
        initModel();
        initControls();
        initStats();

        animate();
        window.onresize = onWindowResize;
    }