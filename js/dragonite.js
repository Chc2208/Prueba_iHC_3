import * as THREE from '../src/three.module.js';
import Stats from '../src/stats.module.js';
import { STLLoader } from '../src/STLLoader.js';
import {PointerLockControls} from '../src/PointerLockControls.js';


let container, stats,pControl;
let camera1, cameraTarget, scene1, renderer1;
const texts = document.querySelector(".texts");

let xdir = 0, zdir = 0
let tiempoI, tiempoF, vel, delta

init();
animate();


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera1 = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera1.position.set( 3, 0.15, 3 );

	cameraTarget = new THREE.Vector3( 0, - 0.25, 0 );

	scene1 = new THREE.Scene();
	scene1.background = new THREE.Color( 0x72645b );
	scene1.fog = new THREE.Fog( 0x72645b, 2, 15 );

	// Ground

	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry( 40, 40 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
	);
	plane.rotation.x = - Math.PI / 2;
	plane.position.y = - 0.5;
	scene1.add( plane );

	plane.receiveShadow = true;


	// ASCII file

	const loader = new STLLoader();
	loader.load( '../modelos/Dragonite.stl', function ( geometry ) {

		const material = new THREE.MeshPhongMaterial( { color: 0xFF8000, specular: 0x111111, shininess: 200 } );
		const mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, - 0.37, - 0.6 );
		mesh.rotation.set( - Math.PI / 2, 0, 0 );
		mesh.scale.set( 0.010, 0.010, 0.010 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		scene1.add( mesh );

	} );

	// Lights

	scene1.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

	//addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	//addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
	// renderer

	renderer1 = new THREE.WebGLRenderer( { antialias: true } );
	//renderer1.setPixelRatio( window.devicePixelRatio );
	renderer1.setSize( window.innerWidth, window.innerHeight );
	renderer1.outputEncoding = THREE.sRGBEncoding;

	renderer1.shadowMap.enabled = true;

	container.appendChild( renderer1.domElement );

	// stats

	stats = new Stats();
	container.appendChild( stats.dom );

	//

	window.addEventListener( 'resize', onWindowResize );

	

}


function onWindowResize() {

	camera1.aspect = window.innerWidth / window.innerHeight;
	camera1.updateProjectionMatrix();

	renderer1.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	camera1.lookAt( cameraTarget );
}

pControl = new PointerLockControls(camera1, renderer1.domElement)

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

animate2()

function animate2() {

    requestAnimationFrame( animate2 );

    if(pControl.isLocked === true){
        tiempoF = Date.now()

        delta = (tiempoF - tiempoI)/1000

        let xDis = xdir * vel * delta
        let zDis = zdir * vel * delta

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF
    }

    renderer1.render( scene1, camera1 );
}

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

recognition.lang = "es-MX";

window.onload = (e) => {

    if (validateSpeechRecognition()) {

        compatible.innerHTML = "¡El navegador es compatible con Speech Recocgnition API!";

        recognition.start();

    }

    else

        compatible.innerHTML = "El navegador NO es compatible con Speech Recocgnition API";

}


recognition.onresult = (e) => {

    const text = Array.from(e.results)

        .map((result) => result[0])

        .map((result) => result.transcript)

        .join("");

    console.log(text);

    if (e.results[0].isFinal) {

        if (text.includes("modelo desaparece")) {

			//texts.innerText = "okis";
					xdir = -1
					zdir = 1
					xdir = 1
					zdir = -1
        }
        else{
			texts.innerText = "Comando de voz no valido";
        }

    }

};

recognition.onend = () => {

    recognition.start();

};

recognition.onstart = () => {

    console.log('Speech recognition service has started');

};

function validateSpeechRecognition() {

    if (!('webkitSpeechRecognition' in window) ||

        !window.hasOwnProperty("webkitSpeechRecognition") ||

        typeof (webkitSpeechRecognition) != "function"

    ) {

        return false;

    }

    else {

        return true;

    }

}
