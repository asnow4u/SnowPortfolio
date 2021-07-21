import React from 'react';
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {initFaces, loadAboutPages, loadProjectPages, loadContactPages} from "./CubeInit";
import {arrowEvent, arrowHover, updateFaces, startCubeSway} from "./SceneFunctions";
import {rotateClickEvent, hoverButtonEvent, iconClickEvent} from "./UserInteraction";
import {initStarBackGround, backgroundStarAnimation} from "./StarBackGround";

const CubeView = (props) => {

  //Navigation Links
  const [gitHubLink, setGitHubLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/gitTab.png');
  const [resumeLink, setResumeLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/resumeLink.png');
  const [linkedInLink, setLinkedInLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/linkedin.png');

  const mount = React.useRef(null);

  //Init component
  React.useEffect(() => {

    //Init scene componenets
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer( {alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    mount.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const clickableObjects = [];

    //Init Cube
    let geometry = new THREE.BoxGeometry( 4, 4, 4 );
    let material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    const cube = new THREE.Mesh( geometry, material );
    cube.canRotate = true;
    cube.currentPage = "about";
    scene.add( cube );

    let aboutCounter = 0;
    const aboutPages = [];
    loadAboutPages(aboutPages, props.data.default.main);

    let projectCounter = 0;
    const projectPages = [];
    loadProjectPages(projectPages, props.data.default.project.projects, clickableObjects);

    let contactCounter = 0;
    const contactPages = [];
    loadContactPages(contactPages, props.data.default.contact, clickableObjects);

    //Cube Faces
    const cubeFaces = [6];
    initFaces(cubeFaces, cube, aboutPages, projectPages[0], contactPages[0]);

    //Init arrow indicators
    let distance = 4;
    let triangleHeight = 0.5;
    let triangleWidth = 1;
    geometry = new THREE.ConeGeometry( triangleWidth, triangleHeight, 2);
    material = new THREE.MeshBasicMaterial( {color: 0x0b4480} );

    //Left arrow indicator
    const leftTriangleMesh = new THREE.Mesh(geometry, material);
    leftTriangleMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
    leftTriangleMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    leftTriangleMesh.position.add(new THREE.Vector3(-distance, 0, 0));
    leftTriangleMesh.name = "leftTriangle";
    leftTriangleMesh.hoverAnimation = false;
    clickableObjects.push(leftTriangleMesh);
    scene.add(leftTriangleMesh);

    //Right arrow indicator
    const rightTriangleMesh = new THREE.Mesh(geometry, material);
    rightTriangleMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
    rightTriangleMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    rightTriangleMesh.position.add(new THREE.Vector3(distance, 0, 0));
    rightTriangleMesh.name = "rightTriangle";
    rightTriangleMesh.hoverAnimation = false;
    clickableObjects.push(rightTriangleMesh);
    scene.add(rightTriangleMesh);

    //Top arrow indicator
    const topTriangleMesh = new THREE.Mesh(geometry, material);
    topTriangleMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
    topTriangleMesh.position.add(new THREE.Vector3(0, distance, 0));
    topTriangleMesh.name = "topTriangle";
    topTriangleMesh.hoverAnimation = false;
    clickableObjects.push(topTriangleMesh);
    scene.add(topTriangleMesh);

    //Bottom arrow indicator
    const bottomTriangleMesh = new THREE.Mesh(geometry, material);
    bottomTriangleMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
    bottomTriangleMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
    bottomTriangleMesh.position.add(new THREE.Vector3(0, -distance, 0));
    bottomTriangleMesh.name = "bottomTriangle";
    bottomTriangleMesh.hoverAnimation = false;
    clickableObjects.push(bottomTriangleMesh);
    scene.add(bottomTriangleMesh);

    //Init background
    initStarBackGround(scene);

    //Init twit sway on cube
    startCubeSway(cube);


    //Animate each frame
    const animate = () => {
      requestAnimationFrame( animate);

      TWEEN.update();

      //Mouse raycast
      raycaster.setFromCamera( mouse, camera);
      const intersects = raycaster.intersectObjects( clickableObjects);

      //Check intersection
      if (intersects.length > 0) {

        //Check for arrow indicator intersection
        if (intersects[0].object.name === "leftTriangle" || intersects[0].object.name === "rightTriangle" || intersects[0].object.name === "topTriangle" || intersects[0].object.name === "bottomTriangle") {
          if (!intersects[0].object.hoverAnimation) {
            arrowHover(intersects[0]);
          }
        }

        //Check for contact icon intersection
        if (intersects[0].object.name === "gitIcon" || intersects[0].object.name === "linkedInIcon" || intersects[0].object.name === "emailIcon") {

          intersects[0].object.hover = true;

          if (intersects[0].object.scale.x < 1.2) {
            intersects[0].object.scale.addScalar(0.05);
          }
        }
      }

      //Check if contact icon is being hovered over or not
      hoverButtonEvent(clickableObjects, cube.currentPage);

      //Animate background
      backgroundStarAnimation(scene.children[5]);

      renderer.render( scene, camera);
    }


    //Check for mouse click
    window.addEventListener('mousedown', () => {

      const intersects = raycaster.intersectObjects( clickableObjects);

      //Check that an intersection exists
      if (intersects.length > 0) {

        //Check if cube is currently not rotating
        if (cube.canRotate) {

          //Check for left or right arrow indicator as click object
          if (intersects[0].object.name === "leftTriangle" || intersects[0].object.name === "rightTriangle") {

            if (cube.currentPage === "about") {
              aboutCounter = rotateClickEvent(intersects[0].object, cube, aboutPages, aboutCounter);
            }

            else if (cube.currentPage === "project") {
              projectCounter = rotateClickEvent(intersects[0].object, cube, projectPages, projectCounter);
            }

            else if (cube.currentPage === "contact") {
              contactCounter = rotateClickEvent(intersects[0].object, cube, contactPages, contactCounter);
            }
          }

          //Check for top arrow indicator as click object
          else if (intersects[0].object.name === "topTriangle") {
            arrowEvent(cube, new THREE.Vector3(1, 0, 0));

            if (cube.currentPage === "about") {
              cube.currentPage = "project";
              updateFaces(projectCounter, projectPages, cube, "up");
            }

            else if (cube.currentPage === "project") {
              cube.currentPage = "contact";
              updateFaces(contactCounter, contactPages, cube, "up");
            }

            else if (cube.currentPage === "contact") {
              cube.currentPage = "about";
              updateFaces(aboutCounter, aboutPages, cube, "up");
            }
          }

          //Check for bottom arrow indicator as click object
          else if (intersects[0].object.name === "bottomTriangle") {
            arrowEvent(cube, new THREE.Vector3(-1, 0, 0));

            if (cube.currentPage === "about") {
              cube.currentPage = "contact";
              updateFaces(contactCounter, contactPages, cube, "down");
            }

            else if (cube.currentPage === "project") {
              cube.currentPage = "about";
              updateFaces(aboutCounter, aboutPages, cube, "down");
            }

            else if (cube.currentPage === "contact") {
              cube.currentPage = "project";
              updateFaces(projectCounter, projectPages, cube, "down");
            }
          }
        }

        //Check for icon intersection
        iconClickEvent(intersects[0].object, cube.currentPage);
      }

    }, false);


    //Update mouse coordinates
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      }, false);


    //Update window
    window.addEventListener('resize', () => {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.render( scene, camera);
    });

    //Start animation loop
    animate();

  }, []);


  return (
    <div className="viewContainer">
      <div className="view" ref={mount} />

      <div className="navWrapper">

        <div className="navLink">
          <a href={process.env.PUBLIC_URL + '/Resume.pdf'} target="_blank" rel="noopener noreferrer">

            <button className="button" id="resumeLink"

              onMouseOver={() => {
                document.getElementById("resumeLink").style.backgroundColor = "black";
                document.getElementById("resumeDesc").style.display = "block";
                setResumeLink(process.env.PUBLIC_URL + '/img/navBar/resumeLink_hover.png');
              }}

              onMouseOut={() => {
                document.getElementById("resumeLink").style.backgroundColor = "rgb(204, 197, 0)";
                document.getElementById("resumeDesc").style.display = "none";
                setResumeLink(process.env.PUBLIC_URL + '/img/navBar/resumeLink.png');
              }}>

              <img className="linkImage" src={resumeLink} alt=""/>
            </button>

            <h5 className="tabDesc" id="resumeDesc">Resume</h5>

          </a>
        </div>

        <div className="navLink">
          <a href="https://github.com/asnow4u?tab=repositories" target="_blank" rel="noopener noreferrer">

            <button className="button" id="gitLink"

              onMouseOver={() => {
                document.getElementById("gitLink").style.backgroundColor = "black";
                document.getElementById("gitDesc").style.display = "block";
                setGitHubLink(process.env.PUBLIC_URL + '/img/navBar/gitTab_hover.png');
              }}

              onMouseOut={() => {
                document.getElementById("gitLink").style.backgroundColor = "rgb(204, 197, 0)";
                document.getElementById("gitDesc").style.display = "none";
                setGitHubLink(process.env.PUBLIC_URL + '/img/navBar/gitTab.png');
              }}>

              <img className="linkImage" src={gitHubLink} alt=""/>
            </button>

            <h5 className="tabDesc" id="gitDesc">Github</h5>

          </a>
        </div>

        <div className="navLink">
          <a href="https://www.linkedin.com/in/asnow4u/" target="_blank" rel="noopener noreferrer">

            <button className="button" id="linkedInLink"

              onMouseOver={() => {
                document.getElementById("linkedInLink").style.backgroundColor = "black";
                document.getElementById("linkedInDesc").style.display = "block";
              }}

              onMouseOut={() => {
                document.getElementById("linkedInLink").style.backgroundColor = "rgb(204, 197, 0)";
                document.getElementById("linkedInDesc").style.display = "none";
              }}>

              <img className="linkImage" src={linkedInLink} alt=""/>
            </button>

            <h5 className="tabDesc" id="linkedInDesc">LinkedIn</h5>

          </a>
        </div>

      </div>

    </div>
  );
}

export default CubeView;
