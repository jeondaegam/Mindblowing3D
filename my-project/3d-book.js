import * as THREE from "three";
import {TextureLoader} from "three";
//https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=270253933

const section = document.querySelector("section.book");
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
section.appendChild(renderer.domElement);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setSize(500,600);
// renderer.setClearColor(0xffffff,1);

// light
const ambient = new THREE.AmbientLight(0x222222); // soft white light
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff); // direction light
light.position.set(0, 0, 6);
// light.position.set(-10,10,10);
light.castShadow = true;
scene.add(light);

camera.position.z = 6;

const urls = {
  front: './images/front.jpg',
  spine: './images/spine.jpg',
  back: ' ./images/back.jpg'
};

// geometry
const geometry = new THREE.BoxGeometry(2.5, 4, 0.5);

function getBookMaterials(urls) {
  const materialNames = ['edge', 'spine', 'top', 'bottom', 'front', 'back']; // 배열

  // get a material one by one
  return materialNames.map((name) => {
    if(!urls[name]) {
      return new THREE.MeshBasicMaterial({color:0xE1D9D9});
    }

    // create a texture
    const texture = new TextureLoader().load(urls[name]);
    texture.generateMipmaps = false;
    texture.miniFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return new THREE.MeshLambertMaterial({map: texture});
  });
}

const cube = new THREE.Mesh(geometry, getBookMaterials(urls));
scene.add(cube);


//===
// scene.background = new THREE.Color(0xffffff);
//
// const planeGeometry = new THREE.PlaneGeometry(500, 500, 32, 32);
// const planeMaterial = new THREE.ShadowMaterial();
// planeMaterial.opacity = 0.5;
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.receiveShadow = true;
// scene.add(plane);
//
// const light = new THREE.DirectionalLight(0xffffff); // direction light
// // light.position.set(0, 0, 6);
// light.position.set(-10,10,10);
// light.castShadow = true;
// scene.add(light);
//
// const geometry = new THREE.BoxGeometry(2.5, 4, 0.5);
// const cube = new THREE.Mesh(geometry, getBookMaterials(urls));
// cube.castShadow = true;
// cube.position.set(0,0,0);
//
// scene.add(cube);
//===

// Smoothing the animation on scroll
// let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

// Rendering the scene
function animate() {
  requestAnimationFrame(animate); // move object

  // currentTimeline += (aimTimeline - currentTimeline) * 0.01;

  const currentTimeline = window.pageYOffset / 3000;
  // const rx = currentTimeline * Math.PI *2;
  const rx = currentTimeline * -0.5 + 0.5;
  // const ry = currentTimeline * Math.PI *2;
  const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2;

  cube.rotation.set(rx, ry, 0);

  // Animating the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera); // => 실제 화면에 rendering 해주는 역할

};

animate();

window.addEventListener('scroll', function () {
  aimTimeline = window.pageYOffset / 3000;
})