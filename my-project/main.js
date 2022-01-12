import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {min} from "three/examples/jsm/renderers/nodes/ShaderNode";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

// graphic renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// draw
renderer.render(scene, camera);
// renderer.setClearColor('#21282a', 1);
renderer.setClearColor('#494949', 0.7);

// 원하는 모양의 geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({wireframe: true}); // the wrapping paper for an object
const material = new THREE.PointsMaterial({
  // color: 0x1414FF,
  color: 0xfffffff,
  size: 0.01,
  blending: THREE.AdditiveBlending
}); // need a Hex color : 0x"color name"
// combine geometry + material
const torus = new THREE.Points(geometry, material);

scene.add(torus);

// 조명
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(30, 30, 20);

// flat light in the room , object 전체에 은은한 조명효과!
// everything seem equally.
const ambientLight = new THREE.AmbientLight(0xffffff);
// // scene.add(pointLight);
scene.add(ambientLight, pointLight);

//
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// create stars ===============
// todo stars 다시 구현해보기


const colors = [0xffffff];
// console.log(colors[Math.floor(Math.random() * colors.length)]);
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24); // 작은 size의 구체를 만든다.
  const material = new THREE.MeshStandardMaterial({
    color: colors[Math.floor(Math.random() * colors.length)],
  });
  const star = new THREE.Mesh(geometry, material);

  // random으로 점을 흩뿌린다 ?
  const [x, y, z] = Array(3).fill().map(
      () => THREE.MathUtils.randFloatSpread(100)); // range 되는 거리, Random float in the interval[-100/2 ~ 100/2]

  star.position.set(x, y, z);
  star.rotation.x += 0.2;
  scene.add(star);
}

// length 200의 array를 만들고 초기화한뒤, 각 인덱스마다 addStar 호출
Array(300).fill().forEach(addStar);

// ==============================
document.addEventListener('mousemove', animateParticles);

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
  mouseY = event.clientY
  mouseX = event.clientX
}

/**
 * Animate
 * @type {*|Texture}
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update objects
  torus.rotation.y = .6*elapsedTime;
  // starMesh.rotation.x = mouseY * (elapsedTime * 0.00008)

  renderer.render(scene, camera)
  windonw.requestAnimationFrame(tick);
}

// ==============================

// set background img
// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// make a my face box
const mineTexture = new THREE.TextureLoader().load('mineblock.jpg');
// mineTexture.wrapS = THREE.RepeatWrapping; // 수평 래핑
// mineTexture.wrapT = THREE.RepeatWrapping; // 수직 래핑
// mineTexture.repeat.set(1);

// mineTexture.magFilter = THREE.NearestFilter;
// const pointLightLeft = new THREE.PointLight(0xff8833,1);
// pointLightLeft.position.set(-2,1,1);
// scene.add(pointLightLeft);
//
// const pointLightRight = new THREE.PointLight(0x33ff77,1);
// pointLightRight.position.set(3,2,2);
// scene.add(pointLightRight);

// const mine = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 2, 2),
//     new THREE.MeshBasicMaterial({map: mineTexture}),
// );
//
// scene.add(mine);

// make a moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 25, 25), // object 생성.
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      color: 0xffffff
      // normalMap: normalTexture
    })
);
moon.position.set(20, 15);
scene.add(moon);

// new block ======================================================
// const grassBlock = new THREE.BoxGeometry(2, 2, 2);
// texture
const grass_texture = new THREE.TextureLoader().load(
    '/minecraft/images/grass.jpg');
const side_texture = new THREE.TextureLoader().load(
    '/minecraft/images/sideGrass.jpg');
const under_texture = new THREE.TextureLoader().load(
    '/minecraft/images/underGrass.jpg');

// material
const materials = [
  // new THREE.MeshBasicMaterial({map:textureSide, side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: side_texture}),
  new THREE.MeshBasicMaterial({map: side_texture}),
  new THREE.MeshBasicMaterial({map: grass_texture}),
  new THREE.MeshBasicMaterial({map: under_texture}),
  new THREE.MeshBasicMaterial({map: side_texture}),
  new THREE.MeshBasicMaterial({map: side_texture}),
];

// combine
const grassBlock = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    materials);

// grassBlock.position.set(-20, 20);
// scene.add(grassBlock);
// new block ======================================================

// animation loop (동작이 loop 될 수 있게)
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // rotation position scale
  // torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01

  moon.rotation.x += -0.01;
  moon.rotation.y += -0.005;
  moon.rotation.z += -0.01;

  // mine.rotation.y += 0.02;
  grassBlock.rotation.y += 0.02;

  controls.update();
}

animate();

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

export function hello() {
  return scene;
}