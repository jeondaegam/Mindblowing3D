import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import {Threex} from "three/examples/jsm/three"
console.log("hey");

const canvas = document.querySelector("#app");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xD5EEFF, 1);
camera.position.setZ(30);

//draw
renderer.render(scene, camera);

// texture of book

const bookCovers = {
  front: "./images/front.jpeg",
  spine: "./images/spine.jpeg",
  back: "./images/back.jpeg"
};

// create texture of materials
const getBookMaterials = (urlMap) => {
  const materialNames = ['edge', 'spine', 'top', 'bottom', 'front', 'back'];
  return materialNames.map((name) => {
    // img가 없을 땐 흰색으로
    if (!urlMap[name]) {
      return new THREE.MeshBasicMaterial({color: 0xffffff});
    }

    const texture = new THREE.TextureLoader().load(urlMap[name]);

    // to create high quality texture
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return new THREE.MeshBasicMaterial({map: texture});
  });

}

// combine geometry and book's materials
const book = new THREE.Mesh(
    new THREE.BoxGeometry(20, 30, 2), getBookMaterials(bookCovers)
);

scene.add(book);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// mouse orbit controls 효과 mouse로 zoom 가능
const controls = new OrbitControls(camera, renderer.domElement);

// ==================================
// const blue = 0x7CC8FD;
// const green = 0x82FD7C;
// const red = 0xFD7C7C;
//
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// // const material = new THREE.MeshBasicMaterial({wireframe: true}); // the wrapping paper for an object
// const material = new THREE.MeshStandardMaterial({color: blue}); // need a Hex color : 0x"color name"
// // meterial에는 색상을 적용해도, embientLight을 넣지 않는 이상 검정색으로 나온다.
// // combine geometry + material
// const torus = new THREE.Mesh(geometry, material);
//
// scene.add(torus); // 단지 scene에 추가하는 작업일 뿐
//
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);
//
// const pointLight = new THREE.PointLight(green);
// pointLight.position.set(30, 30, 20);
// scene.add(pointLight);
// ==================================\
let isMouseOver = false;
book.addEventListener("mouseover", () => {
  isMouseOver = true;
});
book.addEventListener("mouseleave", () => {
  isMouseOver = false;
})

function animate() {
  requestAnimationFrame(animate); // object를 moving
  // console.log(isMouseOver ? "mouse over" : "mouse leave");
  renderer.render(scene, camera); // => ** attention! 화면에 render 해준다.

  // rotation position scale
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01
  //
  book.rotation.x += 0.01;
  book.rotation.y += -0.01;
  book.rotation.z += 0.01;

  // constrols.update();
  // console.log(isClick ? "click" : "not click");
  // isClick = false;
}

console.log("dd");
animate();
