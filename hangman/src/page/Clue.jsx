import React, { useEffect, useState } from 'react'
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
    const [press, setp] = useState(true)

    const handleKeyPress = (e) => {
        const val = e.key;

        if (val === "ArrowLeft"){
            navigate("/scenepage")
            
        }
        else if (val === "ArrowRight"){
            navigate("/hangman")
        }

       setp(p => !p)
    };

    useEffect(() => {
        if (!isAuth())
            navigate("/")
    }, [])
    const handleNext = () => {
        navigate("/hangman")
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [press])
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