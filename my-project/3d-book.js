import * as THREE from "three";

const canvas = document.querySelector("#app");

// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor(0xffffff,1);
document.body.appendChild(renderer.domElement);


renderer.render(scene, camera);

// img url list, getBookMaterials를 호출할 때 사용할 element
const bookCovers = {
  front: "./images/front.jpg",
  spine: "./images/spine.jpg",
  back: "./images/back.jpg"
};

function getBookMaterials(urlMap) {
  const materialMap = ['edge', 'spine', 'top', 'bottom', 'front', 'back'];

  // name list 를 map 으로 불러온다? map 안의 element 이름은 name 이다.
  return materialMap.map(
      (name) => {
        if (!urlMap[name]) {
          return new THREE.MeshBasicMaterial({color: 0xffffff});
        }

        const texture = new THREE.TextureLoader().load(urlMap[name]);

        // to create high quality texture
        texture.generateMipmaps = false;
        texture.miniFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        return new THREE.MeshBasicMaterial({map: texture});

      }
  );
}

const book = new THREE.Mesh(
    new THREE.BoxGeometry(15, 20, 2), getBookMaterials(bookCovers));
book.castShadow = true;
scene.add(book);

function animate() {
  requestAnimationFrame(animate); // move object
  renderer.render(scene, camera); // => 실제 화면에 rendering 해주는 역할

};

animate();