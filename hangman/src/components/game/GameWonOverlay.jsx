import React from 'react'
import "./GameOverlay.css"
import UseCurrentScene from '../../hooks/UseCurrentScene'
import { message } from 'antd'
import axios from 'axios'
import { serverUrl } from '../../config/serverUrl'
import { setLevel, setScene } from '../../auth'
import LevelComplete from '../../page/game/LevelComplete'


const GameWonOverlay = ({ onMenuClick, onRestartClick }) => {
  const currentScene = UseCurrentScene();

  const handleNextLevel = async () => {
    try {
      const level = currentScene.level;
      const res = await axios({
        method : "GET",
        url : `${serverUrl}/levels/${level}`
      })
      console.log(res.data.level)
      const data = res.data.level;
      if(data.next_level === -1){
        console.log("GAME FINISED")
        message.success("GAME FINISED! Thanks for playing")
        return
      }
      setLevel(data.next_level)
      await LevelComplete(1).then(onRestartClick).catch((e) => {
        throw e
      })
    } catch (error) {
      message.error(error.response ? error.response.data.message : error.message)
    }
  }
  return (
    <div className='game-won-cont' >

      <button className='menu-btn' onClick={onMenuClick}>MENU</button>
      <div className='overlay' style={{ padding: "2%" }}>
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
          Crastus is <span style={{ color: '#00FF29' }}>saved! </span>
          Your wisdom and perseverance have pierced through the darkness, sparing him from the gallows.
          <div className='sep' />
          The light of hope shines brightly once more. Prepare yourself for the next challenge as the journey continues
        </div>

        <div className='action-line'>Press <span style={{ color: "#00FFF0" }}>'Next Level'</span> to embark on the next adventure.</div>

        <div className='next-level' onClick={handleNextLevel}>
          NEXT LEVEL
        </div>
      </div>
    </div>
  )

}

export default GameWonOverlay