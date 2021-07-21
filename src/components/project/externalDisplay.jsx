import React from 'react';
import GifPlayer from 'react-gif-player';
import Loom from '@loomhq/loom-embed';


const ExDisplay = (props) => {

  return (

    <div className="externalDisplay" id="display">
      <div className="externalDisplayProject">

        {props.data.externalDisplay.portraitMode ?

          <GifPlayer className="externalDisplayPortraitVideoContainer"
            gif={process.env.PUBLIC_URL + props.data.externalDisplay.video}
            autoplay={true}
          />

          :

          <div className="externalDisplayVideoContainer">
            <iframe className="externalDisplayVideo"
              src={props.data.externalDisplay.video}
              frameBorder="0">
            </iframe>
          </div>
        }

        <div className="externalDisplayTitleContainer">
          <h3 className="externalDisplayTitle">{props.data.name}</h3>

          <a href={props.data.githubLink} target="_blank" rel="noopener noreferrer">
            <img className="externalDisplayTitleButton" src={process.env.PUBLIC_URL + '/img/project/github.png'} alt=""/>
          </a>
        </div>

        <div className="externalDisplayDisc">
          <p className="externalProjectDisc">
            {props.data.externalDisplay.discription}
          </p>
        </div>

        <div className="externalDisplayButtonContainer">
          <img className="displayButton" src={process.env.PUBLIC_URL + '/img/project/exit.png'} alt="" onClick={() => {document.getElementById("display").style.display = "none";}}/>
        </div>

      </div>
    </div>
  );
}

export default ExDisplay;




// {props.data.externalDisplay.portraitMode ?
//
//   <div className="externalDisplayPortraitVideoContainer">
//   <iframe className="externalDisplayVideo" src={process.env.PUBLIC_URL + props.data.externalDisplay.video} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow='autoplay'></iframe>
// </div>
//
//   :
//
//   <GifPlayer className="externalDisplayGifPlayer"
//     gif={process.env.PUBLIC_URL + props.data.externalDisplay.gif}
//     autoplay={true}
//   />
//
// }
