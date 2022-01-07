import * as THREE from "three";
//https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=270253933
// const canvas = document.querySelector("#app");

const section = document.querySelector("section.book");
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor(0xffffff,1);

// light
const ambient = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff); // direction light
light.position.set(0, 0, 7);
scene.add(light);

//
const loader = new THREE.TextureLoader();

const urls = [
  './images/front.jpg',
  './images/front.jpg',
  './images/front.jpg',
  './images/front.jpg',
  './images/spine.jpg',
  ' ./images/back.jpg'
];

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
});

// geometry
const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 6;

// img url list, getBookMaterials를 호출할 때 사용할 element
// const bookCovers = {
//   front: "./images/front.jpg",
//   spine: "./images/spine.jpg",
//   back: "./images/back.jpg"
// };

// function getBookMaterials(urlMap) {
//   const materialMap = ['edge', 'spine', 'top', 'bottom', 'front', 'back'];
//
//   // name list 를 map 으로 불러온다? map 안의 element 이름은 name 이다.
//   return materialMap.map(
//       (name) => {
//         if (!urlMap[name]) {
//           return new THREE.MeshBasicMaterial({color: 0xffffff});
//         }
//
//         const texture = new THREE.TextureLoader().load(urlMap[name]);
//
//         // to create high quality texture
//         texture.generateMipmaps = false;
//         texture.miniFilter = THREE.LinearFilter;
//         texture.needsUpdate = true;
//
//         return new THREE.MeshBasicMaterial({map: texture});
//
//       }
//   );
// }

// const book = new THREE.Mesh(
//     new THREE.BoxGeometry(15, 20, 2), getBookMaterials(bookCovers));
// book.castShadow = true;
// scene.add(book);

// Smoothing the animation on scroll
let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

// Rendering the scene
function animate() {
  requestAnimationFrame(animate); // move object

  currentTimeline += (aimTimeline - currentTimeline) * 0.01;

  // const currentTimeline = window.pageYOffset / 3000;
  // const rx = currentTimeline * Math.PI *2;
  const rx = currentTimeline * -0.5 + 0.5;
  // const ry = currentTimeline * Math.PI *2;
  const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2;

  cube.rotation.set(rx, ry, 0);

  // Animating the cube
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera); // => 실제 화면에 rendering 해주는 역할

};

animate();

window.addEventListener('scroll', function () {
  aimTimeline = window.pageYOffset / 3000;
})