import * as THREE from 'https://unpkg.com/three/build/three.module.js';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

console.log('NOVO');

// Create wavy surface using BufferGeometry
const geometry = new THREE.BufferGeometry();
const geometry2 = new THREE.BufferGeometry();
const amplitude = 0.1;
const frequency = 5;
const divisions = 650;

const positions = new Float32Array((divisions + 1) * (divisions + 1) * 3);
const positions2 = new Float32Array((divisions + 1) * (divisions + 1) * 3);
let index = 0;
let index2 = 0;

console.log('oi');

for (let i = 0; i <= divisions; i++) {
  for (let j = 0; j <= divisions; j++) {
    const u = i / divisions;
    const v = j / divisions;

    const x = u - 0.5;
    const y = amplitude * Math.sin(frequency * Math.PI * u);
    const z = v - 0.5;

    positions[index++] = x;
    positions[index++] = y;
    positions[index++] = z;
  }
}

for (let i = 0; i <= divisions; i++) {
  for (let j = 0; j <= divisions; j++) {
    const u2 = i / divisions;
    const v2 = j / divisions;

    const x2 = u2 - 0.6;
    const y2 = amplitude * Math.cos(frequency * Math.PI * u2) - 0.2;
    const z2 = v2 - 0.3;

    positions2[index2++] = x2;
    positions2[index2++] = y2;
    positions2[index2++] = z2;
  }
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.rotateX(-Math.PI / 2); // Rotate the geometry to make it horizontal

const material = new THREE.MeshBasicMaterial({
  color: 0x363636,
  side: THREE.DoubleSide,
  wireframe: true,
});

geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
geometry2.rotateX(Math.PI / 2); // Rotate the geometry to make it horizontal

const material2 = new THREE.MeshBasicMaterial({
  color: 0x363636,
  side: THREE.DoubleSide,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh);
scene.add(mesh2);

// Set camera position
camera.position.z = 1;

// Handle window resizing
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the wavy surfaces
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;
  mesh2.rotation.x += 0.005;
  mesh2.rotation.y += 0.005;
  renderer.setClearColor( 0xD9DDDC, 0);
  renderer.render(scene, camera);
};

animate();
