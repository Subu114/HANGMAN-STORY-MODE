import React, { forwardRef } from 'react';
import './Level.css';

const Level = forwardRef(({ className }, ref) => {
  return (
    <>
      {className === "active" ?

        <div ref={ref} className={`level-cont` }>
          <div className='header'>LEVEL 1:</div>
          <div className='line-container'>
            <hr className='hr-line' />
            <div className='circle'></div>
          </div>
          <div className='desc'>Your journey begins here, in this realm of darkness and mystery. Will you unravel the secrets hidden within, or will the whispers lead you hanged?</div>

        </div>

        : <>
          <div ref={ref} className={`not-active-container`}>
            <div className='header'>LEVEL 1:
              <div className='desc not-active'>Conquer past trials to unlock the way</div>
            </div>
          </div>
        </>}

    </>
  );
});

export default Level;
