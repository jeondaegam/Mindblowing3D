import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

// graphic renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// draw
renderer.render(scene, camera);

// 원하는 모양의 geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({wireframe: true}); // the wrapping paper for an object
const material = new THREE.MeshStandardMaterial({color: 0x5AA4EA}); // need Hex color : 0x"color name"
// combine geometry + material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// 조명
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 5, 20);

// flat light in the room , object 전체를 비춰준다는 것 같음.
// everything seem equality.
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// animation loop
// 동작이 loop 될 수 있게
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // rotation position scale
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01

}

animate();

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
