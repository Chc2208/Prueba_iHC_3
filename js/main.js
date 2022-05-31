/*----Carga de imagen----- */
function mostrar(){
	var archivo = document.getElementById("file").files[0];
	var reader = new FileReader();
	if (file) {
	  reader.readAsDataURL(archivo);
	  reader.onloadend = function () {
	  document.getElementById("img").src = reader.result;
	  const imagen=document.getElementById("img"); }}}
	  $("#url").change(function(){
	  var url = $(this).val();    
	  document.getElementById("img").src = url;
	  $("#img").html('<img src="'+ url +'" alt="imagen">')    })

import * as THREE from '../src/three.module.js';
import Stats from '../src/stats.module.js';
import { STLLoader } from '../src/STLLoader.js';
import {PointerLockControls} from '../src/PointerLockControls.js'

let   pControl;
let container, stats;
let xdir = 0, zdir = 0;
let camera, cameraTarget, scene, renderer;
let tiempoI, tiempoF, vel, delta;

init();
animate();

const loader = new STLLoader();
	loader.load( './modelos/bulbasaur_starter_1gen_flowalistik.stl', function ( geometry ) {

		const material = new THREE.MeshPhongMaterial( { color: 0xff55ff, specular: 0x111111, shininess: 200 } );
		const mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, - 0.37, - 0.6 );
		mesh.rotation.set( - Math.PI / 2, 0, 0 );
		mesh.scale.set( 0.005, 0.005, 0.005 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		scene.add( mesh );

	} );

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( 3, 0.15, 3 );

	cameraTarget = new THREE.Vector3( 0, - 0.25, 0 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x72645b );
	scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

	// Ground

	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry( 40, 40 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
	);
	plane.rotation.x = - Math.PI / 2;
	plane.position.y = - 0.5;
	scene.add( plane );

	plane.receiveShadow = true;


	// ASCII file

	const loader = new STLLoader();
	loader.load( './modelos/bulbasaur_starter_1gen_flowalistik.stl', function ( geometry ) {

		const material = new THREE.MeshPhongMaterial( { color: 0xff55ff, specular: 0x111111, shininess: 200 } );
		const mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, - 0.37, - 0.6 );
		mesh.rotation.set( - Math.PI / 2, 0, 0 );
		mesh.scale.set( 0.005, 0.005, 0.005 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		scene.add( mesh );

	} );

	// Lights

	scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

	addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
	// renderer

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;

	renderer.shadowMap.enabled = true;

	container.appendChild( renderer.domElement );

	// stats

	stats = new Stats();
	container.appendChild( stats.dom );

	//

	window.addEventListener( 'resize', onWindowResize );

}

function addShadowedLight( x, y, z, color, intensity ) {

	const directionalLight = new THREE.DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z );
	scene.add( directionalLight );

	directionalLight.castShadow = true;

	const d = 1;
	directionalLight.shadow.camera.left = - d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = - d;

	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 4;

	directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	const timer = Date.now() * 0.0005;

	camera.position.x = Math.cos( timer ) * 3;
	camera.position.z = Math.sin( timer ) * 3;

	camera.lookAt( cameraTarget );

	renderer.render( scene, camera );

}
scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
scene.fog = new THREE.Fog(0xffffff, 0, 500)

scene.add(new THREE.GridHelper(10000, 1000))
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,10),
    new THREE.MeshLambertMaterial({color: 0x0000ff})
)
mesh.position.z = -50
scene.add(mesh)

scene.add(new THREE.HemisphereLight(0xffffff))

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.y = 10

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

pControl = new PointerLockControls(camera, renderer.domElement)

document.getElementById('btnPlay').onclick = ()=>{
    pControl.lock()
}

document.addEventListener('keydown', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = -1
            break;
        case 38:
            zdir = 1
            break;
        case 39:
            xdir = 1
            break;
        case 40:
            zdir = -1
            break;
    }
})

document.addEventListener('keyup', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = 0
            break;
        case 38:
            zdir = 0
            break;
        case 39:
            xdir = 0
            break;
        case 40:
            zdir = 0
            break;
    }
})

tiempoI = Date.now()
vel = 50

animate()

function animate() {

    requestAnimationFrame( animate );

    if(pControl.isLocked === true){
        tiempoF = Date.now()

        delta = (tiempoF - tiempoI)/1000

        let xDis = xdir * vel * delta
        let zDis = zdir * vel * delta

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF
    }

    renderer.render( scene, camera );
}
