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

// Define the colors and materials here
const brown = new THREE.MeshToonMaterial({ color: 'Chocolate' });
const darkBrown = new THREE.MeshToonMaterial({ color: 'Sienna' });
const white = new THREE.MeshToonMaterial({ color: 'White' });
const black = new THREE.MeshToonMaterial({ color: 'Black' });
const pink  = new THREE.MeshToonMaterial({ color: 'DeepPink' });

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