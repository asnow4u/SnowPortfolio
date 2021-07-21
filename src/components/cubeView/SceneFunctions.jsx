import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

/*
  => Updates each face to have the correct orientation
  => Updates the cubePosition property of each face
  => Updates visual elements(children) of the face based on the pageArray arg
*/
export const updateFaces = (counter, pageArray, cube, direction) => {

  //Upward Arrow was clicked
  if (direction === "up") {

    //Based on rotational movement of the cube, need to remove the children from the bottom face (becoming back) and add them to the back face (becoming top)
    let temp = new THREE.Group();
    let backFaceIndex;

    //Loop through each face on the cube
    cube.children.forEach((face, index) => {

      //Top Face => Front Face
      if (face.cubePosition === "top") {
        face.cubePosition = "front";
      }

      //Bottom Face => Back Face
      else if (face.cubePosition === "bottom") {
        face.cubePosition = "back";

        //Remove the children element to temp, later to be placed in the new top face
        while (face.children.length) {
          temp.add(face.children[0]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
      }

      //Front Face => Bottom Face
      else if (face.cubePosition === "front") {
        face.cubePosition = "bottom";
      }

      //Left Face
      //Update Face Elements
      else if (face.cubePosition === "left") {

        //Remove previous children elements
        while (face.children.length) {
          face.remove(face.children[0]);
        }

        //Add new children
        if (counter - 1 < 0) {
          face.add(pageArray[pageArray.length -1]);
        } else {
          face.add(pageArray[counter -1]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);
      }

      //Right Face
      //Update Face Elements
      else if (face.cubePosition === "right") {

        //Remove previous children elements
        while (face.children.length) {
          face.remove(face.children[0]);
        }

        //Add new children
        if (counter + 1 >= pageArray.length) {
          face.add(pageArray[0]);
        } else {
          face.add(pageArray[counter + 1]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), -Math.PI/2);
      }

      //Back Face => Top Face
      else if (face.cubePosition === "back") {
        face.cubePosition = "top";

        //Grab index to update with new child elements
        backFaceIndex = index;

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
      }
    });

    //Place the back face children to the top face
    while (temp.children.length) {
      cube.children[backFaceIndex].add(temp.children[0]);
    }
  }


  //Downward Arrow was clicked
  else if (direction === "down") {

    //Based on rotational movement of the cube, need to remove the children from the top face (becoming back) and add them to the back face (becoming bottom)
    let temp = new THREE.Group();
    let backFaceIndex;

    //Loop through each face on the cube
    cube.children.forEach((face, index) => {

      //Top Face => Back Face
      if (face.cubePosition === "top") {
        face.cubePosition = "back";

        //Remove the children elements to temp, later to be placed in the new bottom face
        while (face.children.length) {
          temp.add(face.children[0]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
      }

      //Bottom Face => Front Face
      else if (face.cubePosition === "bottom") {
        face.cubePosition = "front";
      }

      //Front Face => Top Face
      else if (face.cubePosition === "front") {
        face.cubePosition = "top";
      }

      //Left Face
      //Update Face Elements
      else if (face.cubePosition === "left") {

        //Remove previous children elements
        while (face.children.length) {
          face.remove(face.children[0]);
        }

        //Add new children
        if (counter - 1 < 0) {
          face.add(pageArray[pageArray.length -1]);
        } else {
          face.add(pageArray[counter -1]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), -Math.PI/2);
      }

      //Right Face
      //Update Face Elements
      else if (face.cubePosition === "right") {

        //Remove previous children elements
        while (face.children.length) {
          face.remove(face.children[0]);
        }

        //Add new children
        if (counter + 1 >= pageArray.length) {
          face.add(pageArray[0]);
        } else {
          face.add(pageArray[counter + 1]);
        }

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);
      }

      //Back Face => Bottom Face
      else if (face.cubePosition === "back") {
        face.cubePosition = "bottom";

        //Grab index to update with new child elements
        backFaceIndex = index;

        face.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
      }
    });

    //Place the back face children to the bottom face
    while (temp.children.length) {
      cube.children[backFaceIndex].add(temp.children[0]);
    }

  }

  //Left or Right arrow was clicked
  else {

    //Defined rotation axis based on direction arg
    let axis = new THREE.Vector3();

    if (direction === "right") {
      axis.set(0, 0, 1);
    } else if (direction === "left") {
      axis.set(0, 0, -1);
    }

    //Loop through each face on the cube
    cube.children.forEach((face) => {

      //Top Face
      //Rotate face based on axis
      if (face.cubePosition === "top") {
        face.rotateOnAxis(axis, Math.PI/2);
      }

      //Bottom Face
      //Rotate face based on axis
      else if (face.cubePosition === "bottom") {
        face.rotateOnAxis(axis, -Math.PI/2);
      }

      //Front Face => Right Face || Left Face
      else if (face.cubePosition === "front") {

        if (direction === "right") {
          face.cubePosition = "left";

        } else if (direction === "left") {
          face.cubePosition = "right";
        }
      }

      //Back Face => Right Face || Left Face
      //Add new element based on pageArray and counter
      else if (face.cubePosition === "back") {

        if (direction === "right") {
          face.cubePosition = "right";

          if (counter + 1 >= pageArray.length) {
            face.add(pageArray[0]);
          } else {
            face.add(pageArray[counter +1]);
          }

        } else if (direction === "left") {
          face.cubePosition = "left";

          if (counter - 1 < 0) {
            face.add(pageArray[pageArray.length -1]);
          } else {
            face.add(pageArray[counter -1]);
          }
        }
      }

      //Left Face => Front Face || Back Face
      //Remove elements if becoming new Back face
      else if (face.cubePosition === "left") {

        if (direction === "right") {
          face.cubePosition = "back";

          //Remove elements
          while (face.children.length) {
            face.remove(face.children[0]);
          }

        } else if (direction === "left") {
          face.cubePosition = "front";
        }
      }

      //Right Face => Front Face || Back Face
      //Remove elements if becoming new Back face
      else if (face.cubePosition === "right") {

        if (direction === "right") {
          face.cubePosition = "front";

        } else if (direction === "left") {
          face.cubePosition = "back";

          //Remove elements
          while (face.children.length) {
            face.remove(face.children[0]);
          }
        }
      }
    });
  }
}


export const arrowEvent = (cube, axis) => {

  let cubeAngle = 0;
  let start = {angle: cubeAngle};
  let end = {angle: cubeAngle + Math.PI / 2};
  let lastAngle = 0;

  cube.canRotate = false;

  let rotate = new TWEEN.Tween(start)
    .to(end, 1000)
    .delay(200)
    .onUpdate(() => {
      cubeAngle=rotate._object.angle;
      cube.rotateOnWorldAxis(axis, cubeAngle - lastAngle);
      lastAngle=cubeAngle;
    })
    .onComplete(() => {
      cube.canRotate = true;
    })
    .start();
}


export const arrowHover = (obj) => {

  obj.object.hoverAnimation = true;

  if (obj.object.name === "leftTriangle") {

    new TWEEN.Tween(obj.object.position)
      .to({x: "-" + 0.07}, 400)
      .delay(100)
      .easing(TWEEN.Easing.Quadratic.InOut)

      .chain(
        new TWEEN.Tween(obj.object.position)
          .to({x: "+" + 0.07}, 400)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onComplete(() => {
            obj.object.hoverAnimation = false;
          })
      )

      .start();
  }

  else if (obj.object.name === "rightTriangle") {

    new TWEEN.Tween(obj.object.position)
      .to({x: "+" + 0.07}, 400)
      .delay(100)
      .easing(TWEEN.Easing.Quadratic.InOut)

      .chain(
        new TWEEN.Tween(obj.object.position)
          .to({x: "-" + 0.07}, 400)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onComplete(() => {
            obj.object.hoverAnimation = false;
          })
      )

      .start();
  }

  else if (obj.object.name === "topTriangle") {

    new TWEEN.Tween(obj.object.position)
      .to({y: "+" + 0.07}, 400)
      .delay(100)
      .easing(TWEEN.Easing.Quadratic.InOut)

      .chain(
        new TWEEN.Tween(obj.object.position)
          .to({y: "-" + 0.07}, 400)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onComplete(() => {
            obj.object.hoverAnimation = false;
          })
      )

      .start();
  }

  else if (obj.object.name === "bottomTriangle") {

    new TWEEN.Tween(obj.object.position)
      .to({y: "-" + 0.07}, 400)
      .delay(100)
      .easing(TWEEN.Easing.Quadratic.InOut)

      .chain(
        new TWEEN.Tween(obj.object.position)
          .to({y: "+" + 0.07}, 400)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onComplete(() => {
            obj.object.hoverAnimation = false;
          })
      )

      .start();
  }
}


export const startCubeSway = (cube) => {

  let angleX = 0;
  let lastX = 0;

  let sway1 = new TWEEN.Tween({angle: 0})
  .to({angle: 0.1}, 3000)

  .onUpdate(() => {
    angleX = sway1._object.angle;
    cube.rotateOnAxis(new THREE.Vector3(-1, 1, 0), angleX - lastX);
    lastX = angleX;
  })
  .onComplete(() => {
    angleX = 0;
    lastX = 0;
  });

  let sway2 = new TWEEN.Tween({angle: 0})
    .to({angle: 0.1}, 3000)
    .onUpdate(() => {
      angleX = sway2._object.angle;
      cube.rotateOnAxis(new THREE.Vector3(1, 0, 1), angleX - lastX);
      lastX = angleX;
    })
    .onComplete(() => {
      angleX = 0;
      lastX = 0;
    });

  let sway3 = new TWEEN.Tween({angle: 0})
    .to({angle: 0.1}, 3000)
    .onUpdate(() => {
      angleX = sway3._object.angle;
      cube.rotateOnAxis(new THREE.Vector3(1, -1, 0), angleX - lastX);
      lastX = angleX;
    })
    .onComplete(() => {
      angleX = 0;
      lastX = 0;
    });

  let sway4 = new TWEEN.Tween({angle: 0})
  .to({angle: 0.1}, 3000)

  .onUpdate(() => {
    angleX = sway4._object.angle;
    // cube.rotateOnAxis(new THREE.Vector3(-1, 0, -1), angleX - lastX);
    cube.rotateOnAxis(new THREE.Vector3(-1, 1, 0), angleX - lastX);
    lastX = angleX;
  })
  .onComplete(() => {
    angleX = 0;
    lastX = 0;
  });

  let sway5 = new TWEEN.Tween({angle: 0})
    .to({angle: 0.1}, 3000)
    .onUpdate(() => {
      angleX = sway5._object.angle;
      // cube.rotateOnAxis(new THREE.Vector3(-1, -1, 0), angleX - lastX);
      cube.rotateOnAxis(new THREE.Vector3(-1, 0, -1), angleX - lastX);
      lastX = angleX;
    })
    .onComplete(() => {
      angleX = 0;
      lastX = 0;
    });

  let sway6 = new TWEEN.Tween({angle: 0})
    .to({angle: 0.1}, 3000)
    .onUpdate(() => {
      angleX = sway6._object.angle;
      // cube.rotateOnAxis(new THREE.Vector3(1, 1, 0), angleX - lastX);
      cube.rotateOnAxis(new THREE.Vector3(1, -1, 0), angleX - lastX);
      lastX = angleX;
    })
    .onComplete(() => {
      angleX = 0;
      lastX = 0;
    });

  sway1.chain(sway2);
  sway2.chain(sway3);
  sway3.chain(sway4);
  sway4.chain(sway5);
  sway5.chain(sway6);
  sway6.chain(sway1);
  sway1.start();
}
