import * as THREE from "three";

//Init star background
export const initStarBackGround = (scene) => {

  const starCount = 2000;
  const starGeometry = new THREE.BufferGeometry();

  const starArray = new Float32Array(starCount * 3); //Account for x, y, z

  for (let i=0; i<starCount; i++) {
    starArray[i] = (Math.random() - 0.5) * 20;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starArray, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  starField.name = "starField";

  scene.add(starField);
}


//Animate star background
export const backgroundStarAnimation = (stars) => {

  //Star Field
  stars.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.005);
}
