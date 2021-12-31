# Always three objects

1. Scene
2. Camera
3. Renderer

## Scene

Scene == CONTAINER

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
