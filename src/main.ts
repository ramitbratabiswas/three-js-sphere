import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene : THREE.Scene = new THREE.Scene();

// Create sphere
const geometry : THREE.SphereGeometry = new THREE.SphereGeometry(3, 64, 64);
const material : THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
  color: '#ffff88'
})
const mesh : THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Camera
const camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

// Renderer
const canvas : Element = document.querySelector('.webgl')!;
const renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;


// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();