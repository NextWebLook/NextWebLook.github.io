
// three-scene.js
// A simple Three.js scene with a rotating icosahedron and particles.
// Uses r152 CDN; keep this file minimal and dependency-free.

(() => {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  // Icosahedron
  const geom = new THREE.IcosahedronGeometry(1.6, 3);
  const mat = new THREE.MeshStandardMaterial({
    color:0xffffff,
    metalness:0.2,
    roughness:0.15,
    envMapIntensity:0.8,
    transparent:true,
    opacity:0.95
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.scale.set(1.2,1.2,1.2);
  scene.add(mesh);

  // subtle wireframe overlay
  const wire = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,opacity:0.06,transparent:true}));
  scene.add(wire);

  // Lights
  const amb = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(amb);
  const p1 = new THREE.PointLight(0x5b6bff, 1.2, 12);
  p1.position.set(5,3,4);
  scene.add(p1);
  const p2 = new THREE.PointLight(0xec4899, 0.9, 10);
  p2.position.set(-4,-2,3);
  scene.add(p2);

  // Particles
  const ptsGeom = new THREE.BufferGeometry();
  const count = 600;
  const positions = new Float32Array(count * 3);
  for(let i=0;i<count;i++){
    positions[i*3+0] = (Math.random()-0.5) * 30;
    positions[i*3+1] = (Math.random()-0.5) * 30;
    positions[i*3+2] = (Math.random()-0.5) * 30;
  }
  ptsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const ptsMat = new THREE.PointsMaterial({size:0.05, color:0xffffff, opacity:0.12, transparent:true});
  const points = new THREE.Points(ptsGeom, ptsMat);
  scene.add(points);

  // Handle resize
  function resize(){
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w,h, true);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  // Mouse parallax
  let mouseX=0, mouseY=0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -2;
  });

  // Animation loop
  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mesh.rotation.y = t*0.4 + mouseX*0.2;
    mesh.rotation.x = Math.sin(t*0.3)*0.08 + mouseY*0.05;
    wire.rotation.x = mesh.rotation.x * 0.98;
    wire.rotation.y = mesh.rotation.y * 0.98;
    points.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  }
  animate();
})();
