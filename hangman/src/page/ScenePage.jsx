import React, { useEffect, useState } from 'react';
import './ScenePage.css';
import nextButtonImage from '../assets/button_next.png';
import backButtonImage from '../assets/button_back.png';
import { useNavigate } from 'react-router-dom';

import UseCurrentScene from '../hooks/UseCurrentScene';
import { isAuth } from '../auth';
import LoadingPage from '../components/LoadingPage';

const ScenePage = () => {
    const currentScene = UseCurrentScene();
    console.log(currentScene)
    const sceneNumber = `Scene ${currentScene.scene_number}`;
    const sceneStory = currentScene.scene_story;
    const bgImage = currentScene.scene_img;
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuth()) {
            return navigate("/")
        }
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])


    return (
        <LoadingPage loading={loading}>

            <div className="scene-container" style={{ backgroundImage: `url('${bgImage}')`}}>
                <div className='scene-header'>
                    <h1>{sceneNumber}</h1>
                </div>
                <div className='scene-text-container'>
                    <div className="scene-content">
                        <div className='back-scene-button'>
                            <button>
                                <img src={backButtonImage} alt="Back" />
                            </button>
                        </div>
                        <p>{sceneStory}</p>
                        <div className='next-scene-button'>
                            <button onClick={() => { navigate("/clue") }}>
                                <img src={nextButtonImage} alt="Next" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingPage>
    );
};

export default ScenePage;
