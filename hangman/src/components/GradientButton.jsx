import React from 'react';
import './GradientButton.css'; // Import the CSS file for styling

const GradientButton = ({ children, onClick }) => {
  return (
    <button className="gradient-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default GradientButton;
