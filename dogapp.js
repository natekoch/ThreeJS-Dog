var sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

function computeBoundingBOX(object) {
    const box = new THREE.Box3();
    object.geometry.computeBoundingBox();
    box.copy(object.geometry.boundingBox).applyMatrix4(object.matrixWorld);
    console.table(box);
}

// Taken from the three.js docs
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

// Define the colors and materials here
const brown = new THREE.MeshToonMaterial({ color: 'Chocolate' });
const darkBrown = new THREE.MeshToonMaterial({ color: 'Sienna' });
const white = new THREE.MeshToonMaterial({ color: 'White' });
const black = new THREE.MeshToonMaterial({ color: 'Black' });
const pink  = new THREE.MeshToonMaterial({ color: 'DeepPink' });
const green  = new THREE.MeshToonMaterial({ color: 'DarkOliveGreen' });

// Define sphere and cylinders
const sphere = new THREE.SphereGeometry(1, 16, 16);
const cylinder = new THREE.CylinderGeometry(1, 1, 4, 12);

function createDog() {
    // Create the torso and add all the other body parts to it
    const torsoGeometry = cylinder.clone().scale(0.6, 0.6, 1);
    const torso = new THREE.Mesh(torsoGeometry, brown);
    torso.rotation.z = 90 * Math.PI / 180;

    const neckGeometry = cylinder.clone().scale(0.4, 0.41, 0.4);
    const neck = new THREE.Mesh(neckGeometry, brown);
    neck.position.y = -1.5;
    neck.position.x = 0.5;
    neck.rotation.z = 45 * Math.PI / 180;
    torso.add(neck);

    const headGeometry = sphere.clone().scale(0.8, 0.8, 0.8);
    const head = new THREE.Mesh(headGeometry, brown);
    head.position.y = -2.;
    head.position.x = 1.2;
    torso.add(head);

    const legsGeometry = cylinder.clone().scale(0.2, 0.3, 0.2);
    const leg1 = new THREE.Mesh(legsGeometry, brown);
    leg1.position.y = 0.8;
    leg1.position.x = -1;
    leg1.position.z = 0.6;
    leg1.rotation.z = 90 * Math.PI / 180;

    const leg2 = new THREE.Mesh(legsGeometry, brown);
    leg2.position.y = 0.8;
    leg2.position.x = -1;
    leg2.position.z = -0.6;
    leg2.rotation.z = 90 * Math.PI / 180;

    const leg3 = new THREE.Mesh(legsGeometry, brown);
    leg3.position.y = -0.8;
    leg3.position.x = -1;
    leg3.position.z = 0.6;
    leg3.rotation.z = 90 * Math.PI / 180;

    const leg4 = new THREE.Mesh(legsGeometry, brown);
    leg4.position.y = -0.8;
    leg4.position.x = -1;
    leg4.position.z = -0.6;
    leg4.rotation.z = 90 * Math.PI / 180;

    torso.add(leg1, leg2, leg3, leg4);

    // TODO This is where you should add new code
    const eyeGeometry = sphere.clone().scale(0.1, 0.1, 0.1);
    const pupilGeometry = sphere.clone().scale(0.05, 0.05, 0.05);

    const leftEye = new THREE.Mesh(eyeGeometry, white);
    leftEye.position.y = -0.7;
    leftEye.position.x = 0.2;
    leftEye.position.z = 0.3;

    const leftPupil = new THREE.Mesh(pupilGeometry, black);
    leftPupil.position.y = -0.78;
    leftPupil.position.x = 0.2;
    leftPupil.position.z = 0.3;

    const rightEye = new THREE.Mesh(eyeGeometry, white);
    rightEye.position.y = -0.7;
    rightEye.position.x = 0.2;
    rightEye.position.z = -0.3;

    const rightPupil = new THREE.Mesh(pupilGeometry, black);
    rightPupil.position.y = -0.78;
    rightPupil.position.x = 0.2;
    rightPupil.position.z = -0.3;

    head.add(leftEye, rightEye, leftPupil, rightPupil);

    const mouthGeometry = sphere.clone().scale(0.15, 0.6, 0.4);
    const snout = new THREE.Mesh(mouthGeometry, darkBrown);
    snout.position.y = -0.8;
    snout.position.x = 0;
    snout.position.z = 0;

    const jaw = new THREE.Mesh(mouthGeometry, darkBrown);
    jaw.position.y = -0.75;
    jaw.position.x = -0.07;
    jaw.position.z = 0;
    jaw.rotation.z = -40 * Math.PI / 180;

    const tongueGeometry = sphere.clone().scale(0.08, 0.35, 0.1);
    const tongue = new THREE.Mesh(tongueGeometry, pink);
    tongue.position.y = -1.2;
    tongue.position.x = -0.2;
    tongue.position.z = 0;
    tongue.rotation.z = -25 * Math.PI / 180;

    const noseGeometry = sphere.clone().scale(0.07, 0.03, 0.15);
    const nose = new THREE.Mesh(noseGeometry, black);
    nose.position.y = -1.38;
    nose.position.x = 0.03;
    nose.position.z = 0;

    head.add(snout, jaw, tongue, nose);

    const earGeometry = sphere.clone().scale(0.4, 0.1, 0.2);
    const leftEar = new THREE.Mesh(earGeometry, darkBrown);
    leftEar.position.y = 0;
    leftEar.position.x = 0.8;
    leftEar.position.z = 0.35;

    const rightEar = new THREE.Mesh(earGeometry, darkBrown);
    rightEar.position.y = 0;
    rightEar.position.x = 0.8;
    rightEar.position.z = -0.35;

    head.add(leftEar, rightEar);

    const pawGeometry = sphere.clone().scale(0.4, 0.1, 0.3);
    const paw1 = new THREE.Mesh(pawGeometry, darkBrown);
    paw1.position.y = 0.65;
    paw1.position.x = -0.1;
    paw1.position.z = 0;

    leg1.add(paw1);

    const paw2 = new THREE.Mesh(pawGeometry, darkBrown);
    paw2.position.y = 0.65;
    paw2.position.x = -0.1;
    paw2.position.z = 0;

    leg2.add(paw2);

    const paw3 = new THREE.Mesh(pawGeometry, darkBrown);
    paw3.position.y = 0.65;
    paw3.position.x = -0.1;
    paw3.position.z = 0;

    leg3.add(paw3);

    const paw4 = new THREE.Mesh(pawGeometry, darkBrown);
    paw4.position.y = 0.65;
    paw4.position.x = -0.1;
    paw4.position.z = 0;

    leg4.add(paw4);

    const clawGeometry = sphere.clone().scale(0.1, 0.07, 0.05);
    const claw1L = new THREE.Mesh(clawGeometry, black);
    claw1L.position.y = -0.06;
    claw1L.position.x = -0.25;
    claw1L.position.z = 0.15;

    const claw1C = new THREE.Mesh(clawGeometry, black);
    claw1C.position.y = -0.06;
    claw1C.position.x = -0.3;
    claw1C.position.z = 0;

    const claw1R = new THREE.Mesh(clawGeometry, black);
    claw1R.position.y = -0.06;
    claw1R.position.x = -0.25;
    claw1R.position.z = -0.15;

    paw1.add(claw1L, claw1C, claw1R);

    const claw2L = new THREE.Mesh(clawGeometry, black);
    claw2L.position.y = -0.06;
    claw2L.position.x = -0.25;
    claw2L.position.z = 0.15;

    const claw2C = new THREE.Mesh(clawGeometry, black);
    claw2C.position.y = -0.06;
    claw2C.position.x = -0.3;
    claw2C.position.z = 0;

    const claw2R = new THREE.Mesh(clawGeometry, black);
    claw2R.position.y = -0.06;
    claw2R.position.x = -0.25;
    claw2R.position.z = -0.15;

    paw2.add(claw2L, claw2C, claw2R);

    const claw3L = new THREE.Mesh(clawGeometry, black);
    claw3L.position.y = -0.06;
    claw3L.position.x = -0.25;
    claw3L.position.z = 0.15;

    const claw3C = new THREE.Mesh(clawGeometry, black);
    claw3C.position.y = -0.06;
    claw3C.position.x = -0.3;
    claw3C.position.z = 0;

    const claw3R = new THREE.Mesh(clawGeometry, black);
    claw3R.position.y = -0.06;
    claw3R.position.x = -0.25;
    claw3R.position.z = -0.15;

    paw3.add(claw3L, claw3C, claw3R);

    const claw4L = new THREE.Mesh(clawGeometry, black);
    claw4L.position.y = -0.06;
    claw4L.position.x = -0.25;
    claw4L.position.z = 0.15;

    const claw4C = new THREE.Mesh(clawGeometry, black);
    claw4C.position.y = -0.06;
    claw4C.position.x = -0.3;
    claw4C.position.z = 0;

    const claw4R = new THREE.Mesh(clawGeometry, black);
    claw4R.position.y = -0.06;
    claw4R.position.x = -0.25;
    claw4R.position.z = -0.15;

    paw4.add(claw4L, claw4C, claw4R);

    const path = new CustomSinCurve(2);
    const tailGeometry = new THREE.TubeGeometry(path, 20, 1, 8, false).scale(0.2, 0.1, 0.1);
    const tail = new THREE.Mesh(tailGeometry, brown);
    tail.position.y = 1.45;
    tail.position.x = 0.75;
    tail.position.z = 0;
    tail.rotation.z = 35 * Math.PI / 180;

    torso.add(tail);

    const tailEndGeometry = sphere.clone().scale(0.2, 0.2, 0.2);
    const tailEnd = new THREE.Mesh(tailEndGeometry, darkBrown);
    tailEnd.position.y = 0.05;
    tailEnd.position.x = 0.6;
    tailEnd.position.z = 0;

    tail.add(tailEnd);

    const collarGeometry = new THREE.TorusGeometry(10, 3, 16, 100).scale(0.04, 0.04, 0.04);
    const collar = new THREE.Mesh(collarGeometry, green);
    collar.position.y = 0;
    collar.position.x = 0;
    collar.position.z = 0;
    collar.rotation.x = 90 * Math.PI / 180;

    neck.add(collar);

    const pathLead = new CustomSinCurve(4);
    const leashGeometry = new THREE.TubeGeometry(pathLead, 20, 1, 8, false).scale(0.4, 0.1, 0.1);
    const leash = new THREE.Mesh(leashGeometry, green);
    leash.position.y = 0.3;
    leash.position.x = 2.4;
    leash.position.z = 0;

    collar.add(leash);

    const handle = new THREE.Mesh(collarGeometry, green);
    handle.position.y = 0.3;
    handle.position.x = 2.4;
    handle.position.z = 0;

    leash.add(handle);
    

    return torso
}

torso = createDog();

// Add lighting here
const light = new THREE.PointLight(0xFFFFFF, 2, 100);
light.position.set(30, 30, 30);


// Create a new scene
const scene = new THREE.Scene();
// Add all the parts to the scene
scene.add(
    torso,
    light,
);

// Set the camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 15;

// Render the scene
const canvas = document.querySelector('#threejs')
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// This is to control the object with a mouse
// You don't need to worry about it
controls = new THREE.OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', function () {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);

})
const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    /*
    requestAnimationFrame is a method provided by modern web browsers that 
    allows developers to schedule a function to be executed just before the
     next repaint of the browser window. This method is often used for animations 
     and visual effects in web applications because it provides a way to perform 
     smooth and efficient animations without overloading the CPU or causing screen 
     tearing.
    */
}

loop();


function animateBodyPart() {
    // This is an example animation function
    // You should add code to it or create a new function similar to it 
    // to animate a certain body part of the dog
}

// This is how you would attach an animation function to a button on the nav bar
// Below we have attached animateBodyPart function to `Random Animation` button
// on the navbar. Once the button is clicked, it will trigger the animation function
document.getElementById('random-animation').addEventListener('click', function (event) {
    event.preventDefault();
    animateBodyPart();
});


// You also need to find a way how to stop the animation
// You also need to find a way how to reset the positions of the animated object.