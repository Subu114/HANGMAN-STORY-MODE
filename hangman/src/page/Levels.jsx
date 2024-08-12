import React, { useState, useEffect, useRef } from 'react';
import './Levels.css';
import Level from '../components/Level';
import bg from '../assets/level_bg.png';

const Levels = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const levelsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;

      levelsRef.current.forEach((level, index) => {
        const rect = level.getBoundingClientRect();

        // Check if the level element's top and bottom boundaries cross the middle of the screen
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveLevel(index);
        }
      });
    };

    const scrollContainer = document.querySelector('.levels-scroll');
    scrollContainer.addEventListener('scroll', handleScroll);

    // Initial call to handleScroll to set the first active level correctly
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='level-main-container' style={{ backgroundImage: `url(${bg})` }}>
      <div className='level-header-wrapper'>
        <div className='level-header'>
          <div className='level-title'>DESCEND INTO THE DARKNESS:</div>
          <hr />
          <div className='level-description'>UNLOCK YOUR FATE</div>
        </div>
      </div>
      <div className='level-body'>
        <div className='levels-scroll'>
          <div style={{
            marginTop: "3%",
            border: "2px solid transparent",
          }}/>
            <div style={{
              width: "300px",
              marginTop: "5%",
              border: "2px solid transparent",
            }} />
          {Array(5).fill(null).map((_, index) => (
            <Level
              key={index}
              ref={el => levelsRef.current[index] = el}
              className={activeLevel === index ? 'active' : ''}
              />
            ))}
          <div style={{
            width: "300px",
            marginBottom: "20%",
            border: "2px solid transparent",
          }} />
        </div>
      </div>
    </div>
  );
};

export default Levels;
