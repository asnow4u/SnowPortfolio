import React from 'react';
import './navbar.css';


const Navbar = (props) => {

  const [gitHubLink, setGitHubLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/gitTab.png');
  const [resumeLink, setResumeLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/resumeLink.png');
  const [linkedInLink, setLinkedInLink] = React.useState(process.env.PUBLIC_URL + '/img/navBar/linkedin.png');

  return (
    <>

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

    </>
  );
}

export default Navbar;
