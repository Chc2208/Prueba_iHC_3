import * as THREE from './three.module.js';
        import {PointerLockControls} from './PointerLockControls.js'

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
