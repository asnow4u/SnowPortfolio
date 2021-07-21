import React from 'react';
import './aboutme.css';

const AboutMe = (props) => {

  return (
    <div className="section">
      <div className="sectionTitle">{props.data.sectionTitle}</div>
      <div className="barDivider"></div>
      <div className="bioDiv">
        <div className="bio">
          {props.data.discription}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
