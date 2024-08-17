import React, { forwardRef } from 'react';
import './Level.css';

const Level = forwardRef(({ className, level }, ref) => {
  
  return (
    <>
      {className === "active" ?

        <div ref={ref} className={`level-cont` }>
          <div className='header'>LEVEL {level.level}:</div>
          <div className='line-container'>
            <hr className='hr-line' />
            <div className='circle'></div>
          </div>
          <div className='desc'>{level.description}</div>

        </div>

        : <>
          <div ref={ref} className={`not-active-container`}>
            <div className='header'>LEVEL {level.level}:
              <div className='desc not-active'>{level.description}

              </div>
            </div>
          </div>
        </>}

    </>
  );
});

export default Level;
