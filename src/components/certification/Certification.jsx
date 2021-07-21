import React from 'react';
import './certification.css';


const Certificate = (props) => {

  return (
    <div className="section">

      <div className="sectionTitle">Qualifications...</div>
      <div className="barDivider"></div>

      <div className="skillContainer">

        {props.data.programs.map((skill, index) => {
          return (
            <div key={index} className="skillDisplay">
              <img className="skillImage" src={process.env.PUBLIC_URL + skill.image} alt="" />
              <div className="skillTitle"> {skill.name} </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default Certificate;
