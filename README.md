# Always three objects

1. Scene
2. Camera
3. Renderer

## Scene
Scene => CONTAINER

### Background Color of Scene 
Scene의 background color를 변경하는 방법   
1. CSS를 이용한 방법
```javascript
// must first set the "alpha" of your WebGLRenderer to "true"
var renderer = new THREE.WebGLRenderer( {alpha: true} );
```
2. renderer
```javascript
// 0x000000 색상으로 기본 설정 되어있다. 
renderer.setClearColor (0xff0000, 1);
```

## run dev server

```
myfirstThreejs\my-project> npm run dev
```

## JS 문법

Arrays.fill() => 모든 index를 초기화 한다.  
exam

```javascript
// arr의 모든 index의 값을 1로 초기화한다.
Arrays.fill(arr, 1);
[1, 2, 3].fill(3); // expected : [3,3,3]
```

### Hex code is not a String

```javascript
const pointLight = new THREE.PointLight(0xffffff); // (O)
const pointLight = new THREE.PointLight('0xffffff'); // (X)
```
