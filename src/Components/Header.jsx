import React from 'react';
import CustomDropdown from './CustomDropDown'; // Assuming the component is in a separate file

import './headerStyles.css'; // Import the CSS file
 
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerSubDiv">
        <h1 className="headerText">AI MED </h1>
        <br />
        <p className="headerSubText">
          I am a AI medical assistant, I help in taking notes from patient or doctor /patient conversation and arranging them a systematic form , also help in dicision making for diagnosis and treatment.
        </p>
        
      </div>
      <br />
    </div>
  );
};

export default Header;
