import React from 'react'
import "./GameOverlay.css"
import { restartGame } from '../../auth'

const GameWonOverlay = ({ onMenuClick, onRestartClick }) => {
  return (
    <div className='game-won-cont' >

      <button className='menu-btn' onClick={onMenuClick}>MENU</button>
      <div className='overlay' style={{padding : "2%"}}>
        <div className='heading'>
          <div className='rect' />
          <div className='hrLine'>
            <hr></hr>
          </div>

          <div className='game-state'>
            CONGRATULATIONS
          </div>

          <div className='hrLine'>
            <hr></hr>
          </div>
          <div className='rect' />
        </div>
        <div className='state-desc'>
          Crastus is <span style={{ color: '#00FF29' }}>saved!</span>
          Your wisdom and perseverance have pierced through the darkness, sparing him from the gallows.
          <div className='sep' />
          The light of hope shines brightly once more. Prepare yourself for the next challenge as the journey continues
        </div>

        <div className='action-line'>Press <span style={{ color: "#00FFF0" }}>'Next Level'</span> to embark on the next adventure.</div>

        <div className='next-level' onClick={async () => {
          
        }}>
          NEXT LEVEL
        </div>
      </div>
    </div>
  )

}

export default GameWonOverlay