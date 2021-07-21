import * as THREE from "three";

//Init each face for the cube
export const initFaces = (faces, cube, aboutPageArray, topPage, bottomPage) => {

  faces[0] = new THREE.Group();
  faces[0].cubePosition = "front";
  faces[0].position.z += 2.01;
  faces[0].add(aboutPageArray[0]);
  cube.add(faces[0]);

  faces[1] = new THREE.Group();
  faces[1].cubePosition = "top";
  faces[1].position.y += 2.01;
  faces[1].rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI/2);
  faces[1].add(topPage);
  cube.add(faces[1]);

  faces[2] = new THREE.Group();
  faces[2].cubePosition = "left";
  faces[2].position.x -= 2.01;
  faces[2].rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI/2);
  faces[2].add(aboutPageArray[aboutPageArray.length -1]);
  cube.add(faces[2]);

  faces[3] = new THREE.Group();
  faces[3].cubePosition = "bottom";
  faces[3].position.y -= 2.01;
  faces[3].rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2);
  faces[3].add(bottomPage);
  cube.add(faces[3]);

  faces[4] = new THREE.Group();
  faces[4].cubePosition = "right";
  faces[4].position.x += 2.01;
  faces[4].rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/2);
  faces[4].add(aboutPageArray[1]);
  cube.add(faces[4]);

  faces[5] = new THREE.Group();
  faces[5].cubePosition = "back";
  faces[5].position.z -= 2.01;
  faces[5].rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  cube.add(faces[5]);
}


//Init the about pages with associated counter
export const loadAboutPages = (pageArray, data) => {

  const textLoader = new THREE.FontLoader();
  const imageLoader = new THREE.TextureLoader();

  //Title, About, and Skills
  pageArray[0] = new THREE.Group();
  pageArray[1] = new THREE.Group();
  pageArray[2] = new THREE.Group();

  textLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', ( font ) => {

    //Material
    let material = new THREE.LineBasicMaterial({ color: 0xffffff});

    //Home Title
    const name = font.generateShapes( data.title.name, 0.4);
    const title = font.generateShapes( data.title.jobTitle, 0.3);
    const nameGeometry = new THREE.ShapeGeometry(name);
    const titleGeometry = new THREE.ShapeGeometry(title);

    nameGeometry.computeBoundingBox();
    titleGeometry.computeBoundingBox();

    //Fix offset
    let offset = - 0.5 * ( nameGeometry.boundingBox.max.x - nameGeometry.boundingBox.min.x );
    nameGeometry.translate( offset, 0, 0 );
    offset = - 0.5 * ( titleGeometry.boundingBox.max.x - titleGeometry.boundingBox.min.x );
    titleGeometry.translate( offset, 0, 0 );

    //Title Mesh
    const nameMesh = new THREE.Mesh( nameGeometry, material);
    nameMesh.position.y += 0.5;
    nameMesh.position.z += 0.01;
    const titleMesh = new THREE.Mesh( titleGeometry, material);
    titleMesh.position.y -= 0.5;
    titleMesh.position.z += 0.01;

    pageArray[0].add(nameMesh);
    pageArray[0].add(titleMesh);


    //About Title
    const about = font.generateShapes( data.aboutme.title, 0.4);
    const aboutGeometry = new THREE.ShapeGeometry(about);

    aboutGeometry.computeBoundingBox();

    //Fix offset
    offset = - 0.5 * ( aboutGeometry.boundingBox.max.x - aboutGeometry.boundingBox.min.x );
    aboutGeometry.translate( offset, 0, 0 );

    //About mesh
    const aboutMesh = new THREE.Mesh( aboutGeometry, material);
    aboutMesh.position.y += 0.8;
    aboutMesh.position.z += 0.01;

    pageArray[1].add(aboutMesh);


    //Discription
    let strings = data.aboutme.discription.split(" ");
    let charLength = 0;
    let discriptions = [];
    let discriptionIndex = 0;
    discriptions[0] = "";

    //Divide discription into chunks that meet a char length limit
    strings.forEach((string) => {

      if (charLength + string.length > 40) {
        discriptionIndex++;
        discriptions[discriptionIndex] = string + " ";
        charLength = string.length;

      } else {
        discriptions[discriptionIndex] = discriptions[discriptionIndex].concat(string + " ");
        charLength += string.length;
      }
    })

    //Create mesh for each discription chunk
    discriptions.forEach((disc, index) => {
      let discription = font.generateShapes( disc, 0.12);
      let discriptionGeometry = new THREE.ShapeGeometry(discription);

      discriptionGeometry.computeBoundingBox();

      //Fix offset
      offset = - 0.5 * ( discriptionGeometry.boundingBox.max.x - discriptionGeometry.boundingBox.min.x );
      discriptionGeometry.translate( offset, 0, 0 );

      let discriptionMesh = new THREE.Mesh( discriptionGeometry, material);

      //Set linewidth based on index
      discriptionMesh.position.y -= 0.2 * index;
      discriptionMesh.position.z += 0.01;

      pageArray[1].add(discriptionMesh);
    });


    //Skill Title
    const skillTitle = font.generateShapes( data.skill.title, 0.4);
    const skillTitleGeometry = new THREE.ShapeGeometry(skillTitle);

    skillTitleGeometry.computeBoundingBox();

    //Fix offSet
    offset = - 0.5 * ( skillTitleGeometry.boundingBox.max.x - skillTitleGeometry.boundingBox.min.x );
    skillTitleGeometry.translate( offset, 0, 0 );

    //Skill mesh
    const skillTitleMesh = new THREE.Mesh( skillTitleGeometry, material);
    skillTitleMesh.position.y += 0.8;
    skillTitleMesh.position.z += 0.01;

    pageArray[2].add(skillTitleMesh);


    //Skill List
    data.skill.skills.forEach((skill, index) => {
      let skillShape = font.generateShapes( skill, 0.12);
      let skillGeometry = new THREE.ShapeGeometry(skillShape);
      skillGeometry.computeBoundingBox();

      //Fix offSet
      offset = - 0.5 * ( skillGeometry.boundingBox.max.x - skillGeometry.boundingBox.min.x );
      skillGeometry.translate( offset, 0, 0 );

      let skillMesh = new THREE.Mesh( skillGeometry, material);
      skillMesh.position.x -= 0.8;
      skillMesh.position.y -= 0.2 * index;
      skillMesh.position.z += 0.01;
      pageArray[2].add(skillMesh);
    });

    //language List
    data.skill.languages.forEach((language, index) => {
      let languageShape = font.generateShapes( language, 0.12);
      let languageGeometry = new THREE.ShapeGeometry(languageShape);
      languageGeometry.computeBoundingBox();

      //Fix offSet
      offset = - 0.5 * ( languageGeometry.boundingBox.max.x - languageGeometry.boundingBox.min.x );
      languageGeometry.translate( offset, 0, 0 );

      let languageMesh = new THREE.Mesh( languageGeometry, material);
      languageMesh.position.x += 0.8;
      languageMesh.position.y -= 0.2 * index;
      languageMesh.position.z += 0.01;
      pageArray[2].add(languageMesh);
    });

  });

  //image
  let imageGeometry = new THREE.PlaneGeometry(4, 4);

  //Title Image
  let imageMaterial = new THREE.MeshBasicMaterial({map: imageLoader.load(process.env.PUBLIC_URL + data.title.backgroundImage)});
  let image = new THREE.Mesh( imageGeometry, imageMaterial);
  image.position.z -= 0.001;
  pageArray[0].add(image);

  //About Me Image
  imageMaterial = new THREE.MeshBasicMaterial({map: imageLoader.load(process.env.PUBLIC_URL + data.aboutme.backgroundImage)});
  image = new THREE.Mesh( imageGeometry, imageMaterial);
  pageArray[1].add(image);

  //Skill Image
  image = new THREE.Mesh( imageGeometry, imageMaterial);
  pageArray[2].add(image);

}


//Load all projects based on data.json
export const loadProjectPages = (projects, data, clickable) => {

  const textLoader = new THREE.FontLoader();
  const imageLoader = new THREE.TextureLoader();

  //Loop through data
  for (let i=0; i<data.length; i++) {

    projects[i] = new THREE.Group();

    //Load text
    textLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', ( font ) => {

      /* Title
         => Set up the title for the project group utilizing three meshes to accomplish the effect I'm looking for
      */

      //Front font materials
      let frontFontMaterial = new THREE.LineBasicMaterial({ color: data[i].color});

      //Background font materials
      let backFontMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      });

      //Title geometry
      const title = new THREE.Group();

      const frontShapes = font.generateShapes( data[i].name, data[i].fontSize);
      const backShapes = font.generateShapes( data[i].name, data[i].fontSize);

      let frontGeometry = new THREE.ShapeGeometry( frontShapes);
      let backGeometry = new THREE.ShapeGeometry( backShapes);

      //Fix Offset
      frontGeometry.computeBoundingBox();
      backGeometry.computeBoundingBox();

      let offset = - 0.5 * ( frontGeometry.boundingBox.max.x - frontGeometry.boundingBox.min.x );
      frontGeometry.translate( offset, 0, 0 );
      offset = - 0.5 * ( backGeometry.boundingBox.max.x - backGeometry.boundingBox.min.x );
      backGeometry.translate( offset, 0, 0 );

      //Title mesh
      const frontText = new THREE.Mesh( frontGeometry, frontFontMaterial);
      frontText.position.y += 1.25;
      frontText.position.z += 0.01;
      title.add(frontText);

      const backText = new THREE.Mesh(backGeometry, backFontMaterial);
      backText.position.x -= 0.02;
      backText.position.y += 1.25;
      title.add(backText);

      //Title Outline
      let edges = new THREE.EdgesGeometry(frontGeometry);
      let outline = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {color: 0x000000}));
      outline.position.y += 1.25;
      outline.position.z += 0.01;
      title.add(outline);

      /* Discription
         => Set up short discription based on the project
      */

      const discription = new THREE.Group();
      discription.position.y += 0.8;
      discription.position.z += 0.01;

      //Discription material
      let material = new THREE.LineBasicMaterial({ color: data[i].color});

      //Discription geometry
      let shapes = font.generateShapes(data[i].shortDiscription, 0.16);
      let geometry = new THREE.ShapeGeometry( shapes);

      //Fix offset
      geometry.computeBoundingBox();
      offset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( offset, 0, 0 );

      //Discription mesh
      let text = new THREE.Mesh( geometry, material);
      discription.add(text);

      edges = new THREE.EdgesGeometry(geometry);
      outline = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {color: 0x000000}));
      outline.position.z += 0.01;
      discription.add(outline);


      /* Skills
         => List out the skills based on the project
      */

      const skillList = new THREE.Group();
      skillList.position.x += 1;
      skillList.position.z += 0.01;

      material = new THREE.LineBasicMaterial({ color: data[i].color});

      //Loop through skills
      for (let j=0; j<data[i].skills.length; j++) {

        let shapes = font.generateShapes("<" + data[i].skills[j] + ">", 0.16);
        let geometry = new THREE.ShapeGeometry( shapes);

        geometry.computeBoundingBox();
        offset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( offset, 0, 0 );
        let skill = new THREE.Mesh( geometry, material);
        skill.position.y -= 0.4*j;
        skillList.add(skill);

        let edges = new THREE.EdgesGeometry(geometry);
        let outline = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {color: 0x000000}));
        outline.position.y -= 0.4*j;
        outline.position.z += 0.01;

        skillList.add(outline);
      }

      //Add text to scene
      projects[i].add(title);
      projects[i].add(discription);
      projects[i].add(skillList);
    });

    //Background image
    let imageGeometry = new THREE.PlaneGeometry(4, 4);
    let imageMaterial = new THREE.MeshBasicMaterial({map: imageLoader.load(process.env.PUBLIC_URL + data[i].cubeImage), transparent: true, opacity: 0.7});
    let projectImage = new THREE.Mesh( imageGeometry, imageMaterial);
    projectImage.renderOrder = 1;
    projects[i].add(projectImage);

    //Github links
    let linkGeometry = new THREE.CircleGeometry( 0.28, 50);
    let linkMaterial = new THREE.MeshBasicMaterial({
      map: imageLoader.load(process.env.PUBLIC_URL + '/img/project3DView/githubLink.png'),
      transparent: true
    });

    let projectGitButton = new THREE.Mesh( linkGeometry, linkMaterial);

    projectGitButton.renderOrder = 2;
    projectGitButton.position.add(new THREE.Vector3(-1.4, -1.4, 0.01));
    projectGitButton.name = "gitIcon";
    projectGitButton.link = data[i].githubLink;
    projectGitButton.hover = false;

    clickable.push(projectGitButton);
    projects[i].add(projectGitButton);
  }
}


//Load contact page based on links from data.json
export const loadContactPages = (pageArray, data, clickable) => {

  const textLoader = new THREE.FontLoader();
  const imageLoader = new THREE.TextureLoader();

  for (let i=0; i<3; i++) {

    pageArray[i] = new THREE.Group();

    //Background image
    let imageGeometry = new THREE.PlaneGeometry(4, 4);
    let imageMaterial = new THREE.MeshBasicMaterial({map: imageLoader.load(process.env.PUBLIC_URL + data.backgroundImage)});
    let backgroundImage = new THREE.Mesh( imageGeometry, imageMaterial);
    backgroundImage.position.z -= 0.001;
    pageArray[i].add(backgroundImage);


    //Github button link
    let linkGeometry = new THREE.CircleGeometry( 0.7, 50);
    let linkMaterial = new THREE.MeshBasicMaterial({
      map: imageLoader.load(process.env.PUBLIC_URL + data.githubIcon),
      transparent: true,
      depthTest: false
    });

    const contactGitButton = new THREE.Mesh( linkGeometry, linkMaterial);

    //Setup properties
    contactGitButton.position.add(new THREE.Vector3(0, 0, 0.1));
    contactGitButton.name = "gitIcon";
    contactGitButton.link = data.githubLink;
    contactGitButton.hover = false;

    //Add as interactable object
    clickable.push(contactGitButton);

    //Add to page
    pageArray[i].add(contactGitButton);


    //LinkedIn button link
    linkMaterial = new THREE.MeshBasicMaterial({
      map: imageLoader.load(process.env.PUBLIC_URL + data.linkedInIcon),
      transparent: true,
      depthTest: false
    });

    let contactLinkedInButton = new THREE.Mesh( linkGeometry, linkMaterial);

    //Setup properties
    contactLinkedInButton.position.add(new THREE.Vector3(1.2, 0, 0.1));
    contactLinkedInButton.name = "linkedInIcon";
    contactLinkedInButton.link = data.linkedinLink;
    contactLinkedInButton.hover = false;

    //Add as interactable object
    clickable.push(contactLinkedInButton);

    //Add to page
    pageArray[i].add(contactLinkedInButton);


    //Email button link
    linkMaterial = new THREE.MeshBasicMaterial({
      map: imageLoader.load(process.env.PUBLIC_URL + data.emailIcon),
      transparent: true,
      depthTest: false
    });

    let contactEmailButton = new THREE.Mesh( linkGeometry, linkMaterial);

    //Setup properties
    contactEmailButton.position.add(new THREE.Vector3(-1.2, 0, 0.1));
    contactEmailButton.name = "emailIcon";
    contactEmailButton.link = "mailto:asnow4u@gmail.com";
    contactEmailButton.hover = false;

    //Add as interactable
    clickable.push(contactEmailButton);

    //Add to page
    pageArray[i].add(contactEmailButton);


    //Load title and discriptions
    textLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', ( font ) => {

      //Text material
      let material = new THREE.LineBasicMaterial({
        color: 0x000000
      });

      //Title
      const shape = font.generateShapes( "Contact Me", 0.4);
      const geometry = new THREE.ShapeGeometry(shape);
      geometry.computeBoundingBox();
      let offset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( offset, 0, 0 );

      const mesh = new THREE.Mesh( geometry, material);
      mesh.position.y += 1.25;

      pageArray[i].add(mesh);


      const hoverDiscription = new THREE.Group();
      hoverDiscription.name = "hoverDiscriptions";


      //Default discription
      const defaultShape = font.generateShapes( data.defaultDiscription, 0.25);
      const defaultGeometry = new THREE.ShapeGeometry(defaultShape);
      defaultGeometry.computeBoundingBox();
      offset = - 0.5 * ( defaultGeometry.boundingBox.max.x - defaultGeometry.boundingBox.min.x );
      defaultGeometry.translate( offset, 0, 0 );

      const defaultMesh = new THREE.Mesh( defaultGeometry, material);

      defaultMesh.position.y -= 1.3;
      defaultMesh.visible = true;
      defaultMesh.name = "defaultDiscription";

      hoverDiscription.add(defaultMesh);


      //Email Hover Discription
      const emailShape = font.generateShapes( data.emailDiscription, 0.2);
      const emailGeometry = new THREE.ShapeGeometry(emailShape);
      emailGeometry.computeBoundingBox();
      offset = - 0.5 * ( emailGeometry.boundingBox.max.x - emailGeometry.boundingBox.min.x );
      emailGeometry.translate( offset, 0, 0 );

      const emailMesh = new THREE.Mesh( emailGeometry, material);

      emailMesh.position.y -= 1.3;
      emailMesh.visible = false;
      emailMesh.name = "emailDiscription";

      hoverDiscription.add(emailMesh);


      //GitHub Hover Discription
      const gitHubShape = font.generateShapes( data.gitHubDiscription, 0.2);
      const gitHubGeometry = new THREE.ShapeGeometry(gitHubShape);
      gitHubGeometry.computeBoundingBox();
      offset = - 0.5 * ( gitHubGeometry.boundingBox.max.x - gitHubGeometry.boundingBox.min.x );
      gitHubGeometry.translate( offset, 0, 0 );

      const gitHubMesh = new THREE.Mesh( gitHubGeometry, material);

      gitHubMesh.position.y -= 1.25;
      gitHubMesh.visible = false;
      gitHubMesh.name = "gitHubDiscription";

      hoverDiscription.add(gitHubMesh);

      //linkedIn Hover Discription
      const linkedInShape = font.generateShapes( data.linkedInDiscription, 0.2);
      const linkedInGeometry = new THREE.ShapeGeometry(linkedInShape);
      linkedInGeometry.computeBoundingBox();
      offset = - 0.5 * ( linkedInGeometry.boundingBox.max.x - linkedInGeometry.boundingBox.min.x );
      linkedInGeometry.translate( offset, 0, 0 );

      const linkedInMesh = new THREE.Mesh( linkedInGeometry, material);

      linkedInMesh.position.y -= 1.3;
      linkedInMesh.visible = false;
      linkedInMesh.name = "linkedInDiscription";

      hoverDiscription.add(linkedInMesh);


      pageArray[i].add(hoverDiscription);

    });
  }
}
