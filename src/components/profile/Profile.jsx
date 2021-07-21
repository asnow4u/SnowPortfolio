import React from 'react';
import './profile.css';


const ProfileInfo = (props) => {

  return (
    <div className="profileInfo">

      <div className="profileName">
        {props.data.name}
      </div>
      <div className="barDivider"></div>
      <div className="profileJob">
        {props.data.jobTitle}
      </div>

    </div>
  );
}

export default ProfileInfo;
