import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Function to create a wave
function createWave(amplitude, frequency, divisions, xOffset, yOffset, zOffset, color) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array((divisions + 1) * (divisions + 1) * 3);
  let index = 0;

  for (let i = 0; i <= divisions; i++) {
    for (let j = 0; j <= divisions; j++) {
      const u = i / divisions;
      const v = j / divisions;

      const x = u - 0.5 + xOffset;
      const y = amplitude * Math.sin(frequency * Math.PI * u) + yOffset;
      const z = v - 0.5 + zOffset;

      positions[index++] = x;
      positions[index++] = y;
      positions[index++] = z;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    emissive: new THREE.Color(0xffffff), // Brighter emissive color
    emissiveIntensity: 2, // Increase emissive intensity
    roughness: 0.5,
    metalness: 0.5,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// Create and position multiple waves
createWave(0.1, 5, 650, 0, 0, 0, 0x0000ff);
createWave(0.1, 5, 650, -0.1, -0.5, -0.2, 0xff0000);
createWave(0.1, 5, 650, 0.1, 0.5, 0.2, 0x00ff00);

// Set camera position
camera.position.z = 2; // Adjusted camera position

// Set up lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1); // Adjusted light position
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.8)); // Increased ambient light intensity and color

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate all waves
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.005;
      child.rotation.y += 0.005;
    }
  });

  renderer.setClearColor(0x000000, 0);
  renderer.render(scene, camera);
};

animate();
