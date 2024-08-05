import React from 'react'

const GradientButton = ({ children, onClick }) => {
    const buttonStyle = {
      display: 'inline-block',
      padding: '2px',
      borderRadius: '20px',
      border: '2px solid transparent',
      background: 'linear-gradient(to right, blue, red) border-box',
      color: 'white',
      fontSize: '16px',
      fontWeight: '200',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: '0.3s'
    };
    
    const innerStyle = {
      background: '#000', // or the background color you want inside the border
      padding: '5px 18px',
      borderRadius: '18px',
      textAlign : "center"
    };

    return (
      <div style={buttonStyle} onClick={onClick}>
        <div style={innerStyle}>
          {children}
        </div>
      </div>
    );
  };

export default GradientButton