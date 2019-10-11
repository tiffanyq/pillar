/* create a pillar that can be spun around.
*/

// scene
var scene = new THREE.Scene();

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xf0f8ff); // set to light blue
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(5, 10, 10);
camera.lookAt(0,0,0); // origin
scene.add(camera);

// disable scroll for better ux
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// light: shine a light directly onto the column
light = new THREE.PointLight(0xfefebe);
light.position.set(0,10,4);
scene.add(light);
ambientLight = new THREE.AmbientLight(0xf0ead6);
scene.add(ambientLight);

// create the pillar
var geometry = new THREE.BoxGeometry( 2, 12, 2 );
var loader = new THREE.TextureLoader();
var materials = [
	new THREE.MeshLambertMaterial( {map: loader.load('img/2.jpg')} ),
	new THREE.MeshLambertMaterial( {map: loader.load('img/4.jpg')} ),
	new THREE.MeshLambertMaterial( { color: 0xffffee } ),
	new THREE.MeshLambertMaterial( { color: 0xffffee } ),
	new THREE.MeshLambertMaterial( {map: loader.load('img/1.jpg')} ),
	new THREE.MeshLambertMaterial( {map: loader.load('img/3.jpg')} ),

];

var pillar = new THREE.Mesh( geometry, materials );
scene.add( pillar );

// add orbit controls
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// adjust for window resize
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// global variable to store mouse state
mouseDown = false;
window.addEventListener('mouseup', e => {
	mouseDown = false;
});
window.addEventListener('mousedown', e => {
	mouseDown = true;
});

// update the scene
function animate() {
	// make the pillar rotate around the y-axis
	// if it's not being dragged
	if (!mouseDown) {
		pillar.rotation.y += Math.PI/1440;
	}
	if (document.getElementById("yrotation")) {
		var currRot = ((pillar.rotation.y*180/Math.PI)%360).toString().substring(0,5);
		document.getElementById("yrotation").innerText = currRot;
	}
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

// add event listeners
window.addEventListener('resize',resize);

// call the functions
animate();
resize();