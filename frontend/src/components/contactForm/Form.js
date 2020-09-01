import React from 'react';
import './Form.css'

const Form = (props) => {
  return(
    <div id="contact" className="contact">
      <h2 className="center lead"> Contact Us </h2>
      <form 
        action="http://localhost:5000/api/formdata" 
        id="contact_form" 
        className="contact-form" 
        method="post" 
        target="_blank"
      >
        <div className="form-field">
          <label for="name"> NAME </label>         
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-field">
          <label for="email"> EMAIL</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className="form-field">
          <label for="pnumber"> PHONE NUMBER </label>
          <input type="tel" name="pnumber" id="pnumber" />
        </div>
        <div className="form-field">
          <input type="submit" class="submit-btn" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;