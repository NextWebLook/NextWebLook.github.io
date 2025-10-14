// assets/js/scene.js
const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create wave plane
const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const material = new THREE.MeshPhongMaterial({
  color: 0x111111,
  emissive: 0x00ffff,
  emissiveIntensity: 0.4,
  shininess: 40,
  side: THREE.DoubleSide,
  flatShading: true
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Lighting
const light1 = new THREE.PointLight(0x00ffff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x0099ff, 0.6);
light2.position.set(-5, 5, -5);
scene.add(light2);

camera.position.set(0, 2, 4);

// Animate waves
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.015;

  const pos = plane.geometry.attributes.position;
  const len = pos.count;
  for (let i = 0; i < len; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const wave = Math.sin(x * 1.5 + time) * 0.2 + Math.cos(y * 1.2 + time) * 0.2;
    pos.setZ(i, wave);
  }
  pos.needsUpdate = true;

  plane.rotation.z += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});