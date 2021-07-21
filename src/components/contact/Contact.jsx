import React from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    }
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onEmailChange(event) {
    this.setState({email: event.target.value});
  }

  onMessageChange(event) {
    this.setState({message: event.target.value});
  }

  sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_7aclidw', 'template_zs0o21o', e.target, 'user_TTUupRfAYvDalWIqcNqW2')
     .then((result) => {
        alert("Thanks For The Email");
        console.log(result.text);
     }, (error) => {
         console.log(error.text);
     });

     e.target.reset();
  }

  render() {
    return (
      <div className="section">
        <div className="sectionTitle">Lets Talk...</div>
        <div className="barDivider"></div>

        <form className="contactForm" id="contactForm" onSubmit={this.sendEmail.bind(this)} method="POST">
          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input type="text" className="formControl" value={this.state.name} onChange={this.onNameChange.bind(this)} name='name'/>
          </div>

          <div className="formGroup">
            <label htmlFor="exampleEmail">Email address:</label>
            <input type="email" className="formControl" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} name='email'/>
          </div>
          <div className="formGroup">
            <label htmlFor="message">Message:</label>
            <textarea className="formControl" value={this.state.message} onChange={this.onMessageChange.bind(this)} name='message'></textarea>
          </div>
          <button type="submit" className="submitButton">Send</button>
        </form>
      </div>
    );
  }
}

export default Contact;
