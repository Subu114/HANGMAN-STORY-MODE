import React, { useEffect, useState } from 'react';
import './ScenePage.css';
import nextButtonImage from '../../assets/button_next.png';
import backButtonImage from '../../assets/button_back.png';
import { useNavigate } from 'react-router-dom';

import UseCurrentScene from '../../hooks/UseCurrentScene';
import { isAuth } from '../../auth';
import LoadingPage from '../../components/LoadingPage';
import { message } from 'antd';

const ScenePage = () => {
    const currentScene = UseCurrentScene();
    const sceneNumber = `Scene ${currentScene?.scene_number}`;
    const sceneStory = currentScene?.scene_story;
    const bgImage = currentScene?.scene_img;
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    const [press, setp] = useState(true)

    const handleKeyPress = (e) => {
        const val = e.key;

        if (val === "Escape") {
            navigate("/user")
        }
        else if (val === "ArrowLeft") {
            navigate("/prescene")
        }
        else if (val === "ArrowRight") {
            navigate("/clue")
        }

        setp(p => !p)
    };
    useEffect(() => {
        if (!isAuth()) {
            return navigate("/")

        }
        if (!currentScene) {
            message.error("No Scene Found!")
            return navigate("/user")
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [press])

    return (
        <LoadingPage loading={loading}>

            <div className="scene-container" style={{ backgroundImage: `url('${bgImage}')` }}>
                <div className='scene-header'>
                    <h1>{sceneNumber}</h1>
                </div>
                <div className='scene-text-container'>
                    <div className="scene-content">
                        <div className='back-scene-button'>
                            <button onClick={() => { navigate("/prescene") }}>
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
