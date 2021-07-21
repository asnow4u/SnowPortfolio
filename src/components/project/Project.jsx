import React from 'react';
import ExDisplay from './externalDisplay';
import './project.css';

const Project = (props) => {

  const [displayProjectID, setDisplayProjectID] = React.useState(0);


  const UpdateProjectDisplay = (project, index) => {

    let display = document.getElementById("display").style.display = "block";
    setDisplayProjectID(index);
  }


  return (
    <div className="section">

      <div className="sectionTitle">{props.data.sectionTitle}</div>
      <div className="barDivider"></div>

      <div className="showcaseProjects">
        {props.data.projects.map((project, index) => {
          return (
            <div key={index} className="projectTile" onClick={() => UpdateProjectDisplay(project, index)}>
              <img className="projectImage" src={process.env.PUBLIC_URL + project.externalDisplay.image} alt="" />
              <div className="projectTitle">{project.name}</div>
            </div>
          );
        })}
      </div>

      <ExDisplay data={props.data.projects[displayProjectID]}/>

    </div>
  );
}

export default Project;
