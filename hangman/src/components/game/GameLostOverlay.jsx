import React from 'react'
import "./GameOverlay.css"
import { restartGame } from '../../auth'

const GameLostOverlay = ({ onMenuClick, onRestartClick }) => {
    return (
        <div className='game-won-cont'>

            <button className='menu-btn' onClick={onMenuClick}>MENU</button>
            <div className='overlay'>
                <div className='heading'>
                    <div className='rect' />
                    <div className='hrLine'>
                        <hr></hr>
                    </div>

                    <div className='game-state'>
                        GAMEOVER
                    </div>

                    <div className='hrLine'>
                        <hr></hr>
                    </div>
                    <div className='rect' />
                </div>
                <div className='state-desc'>
                    Crastus has been <span style={{ color: 'red' }}>hanged</span>, his faith unyielding to the end. The shadows have won this round, but hope endures.
                    <div className='sep' />
                    Rise again, challenge the darkness, and let his sacrifice inspire your quest for redemption...
                </div>

                <div className='action-line'>Press <span style={{ color: "#00FFF0" }}>'Restart'</span> to reignite the light</div>

                <div className='action-btn' onClick={async () => {
                    if (await restartGame())
                        onRestartClick();

                }}>
                    <div className='btn'>Restart</div>
                </div>
            </div>
        </div>
    )
}

export default GameLostOverlay