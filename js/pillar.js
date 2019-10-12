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
camera.position.set(5.000, 10.00, 10.00);
camera.lookAt(0,0,0); // origin
scene.add(camera);

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
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.damping = 0.2;
controls.autoRotate = false;

// disable scroll for better ux
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// adjust for window resize
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// update the scene
function animate() {
	if (document.getElementById("cam")) {
		var camX = camera.position.x.toString().substring(0,5);
		var camY = camera.position.y.toString().substring(0,5);
		var camZ = camera.position.z.toString().substring(0,5);
		var camCoord = '(' + camX + ', ' + camY + ', ' + camZ + ')';
		document.getElementById("cam").innerText = camCoord;
	}

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

// add event listeners
window.addEventListener('resize',resize);

// call the functions
animate();
resize();