import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';
import { BufferGeometryUtils } from 'https://unpkg.com/three@latest/examples/jsm/utils/BufferGeometryUtils.js';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
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

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/your/abaporu-tarsila.jpeg');

// Create main mountain
const upperPartGeometry = new THREE.SphereGeometry(10, 50, 50, 0, Math.PI * 2, 0, Math.PI / 2);
const bottomPartGeometry = new THREE.CylinderGeometry(0, 10, 20, 50, 1);
const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([upperPartGeometry, bottomPartGeometry]);
const mountainMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
const mountain = new THREE.Mesh(mergedGeometry, mountainMaterial);
scene.add(mountain);

// Set camera position
camera.position.z = 30; // Move the camera back
camera.position.y = 0; // Align the camera with the scene

// Set up lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Animation loop
const animate = () => {
requestAnimationFrame(animate);

// Rotate the mountain
mountain.rotation.y += 0.005;

renderer.setClearColor(0xD9DDDC, 0);
renderer.render(scene, camera);
};

animate();