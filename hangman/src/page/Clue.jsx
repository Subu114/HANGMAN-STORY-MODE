import React, { useEffect } from 'react'
import clueBg from '../assets/clue.png'
import "./Clue.css"
import nextBtn from "../assets/clue_next_btn.png"
import UseCurrentScene from '../hooks/UseCurrentScene'
import { useNavigate } from 'react-router-dom'
import { isAuth } from '../auth'
const Clue = ({ }) => {
    const currentScene = UseCurrentScene()
    const sceneNumber = `Scene ${currentScene.scene_number}`
    const clue = currentScene.scene_clue
    const bgImage = currentScene.scene_img
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth())
            navigate("/")
    }, [])
    const handleNext = () => {
        navigate("/hangman")
    }
    return (
        <div className="clue-container" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='scene-header'>
                <h1>{sceneNumber}</h1>
            </div>

            <span className='clue-bg' style={{ backgroundImage: `url(${clueBg})` }}>

                <p className='clue-content'>
                    {clue}
                </p>
                <div className='button-container'>
                    <button onClick={handleNext}>
                        <img src={nextBtn}></img>
                    </button>
                </div>
            </span>
        </div>
    )
}

export default Clue