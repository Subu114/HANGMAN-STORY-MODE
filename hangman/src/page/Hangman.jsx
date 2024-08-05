import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import UseCurrentScene from '../hooks/UseCurrentScene';
import "./Hangman.css";
import HangmanImage from '../data/HangmanImg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { _id, token } from '../config/userData';
import { serverUrl } from '../config/serverUrl';
import LevelComplete from './LevelComplete';
import useFetchWord from '../hooks/useFetchWord';
import LoadingPage from '../components/LoadingPage';
import { isAuth } from '../auth';

const Hangman = () => {
    const navigate = useNavigate();
    const currentScene = UseCurrentScene();
    const { data: word, loading, error } = useFetchWord(currentScene.scene_number);
    console.log(word)
    const [hint, setHint] = useState();
    const [status, setStatus] = useState('pending');
    const [displayWord, setDisplayWord] = useState([]);
    const [wrongGuessed, setWrongGuessed] = useState([]);
    const [hangmanImg, setHangmanImg] = useState(null);

    const bgImage = currentScene.scene_img;
    const branch = HangmanImage[10];

    const fetchData = async () => {
        const controller = new AbortController();
        const { signal } = controller;
        try {
            const res = await axios({
                method: "GET",
                url: `${serverUrl}/users/game-state/${_id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                signal
            });
            setHint(res.data.gameState.hint);
            setDisplayWord(res.data.gameState.display_word.split(' '));
            setWrongGuessed(() => {
                const val = res.data.gameState.wrong_guessed.split(' ')
                if (val.includes(''))
                    return []
                return val;
            });
            message.info("Press any alphabet from your keyboard to start!", 5)
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.log("error : ", error);
                message.error(error.response ? error.response.data.message : error.message, 5)
                return navigate("/user")
            }
        }
        return () => controller.abort();
    };

    useEffect(() => {
        if (!isAuth()){
            message.error("User not authenticated!", 5)
            return navigate("/")
        }
        
        fetchData();
    }, []);

    const postGameState = async () => {
        const controller = new AbortController();
        const { signal } = controller;
        try {
            console.log(hint)
            await axios({
                method: "POST",
                url: `${serverUrl}/users/game-state/create`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    user_id: _id,
                    scene_id: currentScene.scene_number,
                    hint: hint,
                    display_word: displayWord.join(' '),
                    wrong_guessed: wrongGuessed.join(' ').trim()
                },
                signal
            });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.log("Error posting game state:", error);
                message.error(error.response ? error.response.data.message : error.message, 5)
            }
        }
        return () => controller.abort();
    };

    useEffect(() => {
        if (displayWord.length > 1) {
            postGameState();
        }
    }, [displayWord, wrongGuessed, hint]);

    useEffect(() => {
        if (displayWord.length <= 1)
            return;
        if (!displayWord?.includes("_")) {
            setStatus('won');
            gameStatus();
        }
    }, [displayWord]);

    useEffect(() => {
        if (wrongGuessed?.length >= 6 && displayWord.length > 1) {

            setHangmanImg(HangmanImage[wrongGuessed.length]);
            setStatus('lost');
            gameStatus();
        }
        else if (wrongGuessed.length >= 0) {
            console.log("I ", wrongGuessed.length)
            console.log(wrongGuessed)
            setHangmanImg(HangmanImage[wrongGuessed.length]);
        }
    }, [wrongGuessed]);


    const gameStatus = () => {
        if (status === "pending") return true;

        if (status === "lost") {
            message.warning("Game Over\nKindly Restart the game and Try Again😇");
        }

        if (status === "won") {
            message.success("Level Complete\nKindly Go to the next Scene✅");
        }

        return false;
    };

    const getHint = () => {
        if (hint <= 0 || !gameStatus()) return;

        const index = Math.floor(Math.random() * word.length);
        let arr = [...displayWord];
        if (arr[index] !== "_") return getHint();

        setHint(val => val - 1);
        correctGuess(word[index]);
    };

    const letterIsPresent = (a) => {
        if (!a) return [];
        return [...word].reduce((acc, letter, i) => (letter === a ? [...acc, i] : acc), []);
    };

    const correctGuess = (val) => {
        if (!gameStatus()) return;

        const indices = letterIsPresent(val);
        const newDisplayWord = [...displayWord];
        indices.forEach(index => {
            newDisplayWord[index] = val;
        });
        setDisplayWord(newDisplayWord);
    };

    const wrongGuess = (val) => {
        if (!gameStatus() || wrongGuessed.includes(val)) return;

        setWrongGuessed(wg => [...wg, val]);
    };

    const handleKeyPress = (e) => {
        const val = e.key.toUpperCase();
        if (!val || val.length > 1) return;

        console.log(val, val.length)
        if (!(val >= "A" && val <= "Z")) {
            if (gameStatus()) message.warning("Invalid Input\nPlease enter only alphabets!!", 5);
            return;
        }
        if (word.includes(val)) {
            correctGuess(val);
        } else {
            wrongGuess(val);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [word, displayWord, wrongGuessed]);

    if (error) {
        message.error("Error occured!")
        setTimeout(navigate("/user"), 5000)
        return (
            <div></div>
        )
    }

    return (
        <LoadingPage loading={loading}>
            <div className="mainn-container" style={{ backgroundImage: `url(${bgImage})` }}>
                
                <div className='hint-container'>
                    <Button onClick={getHint}>Hint {hint}</Button>
                </div>
                <div className='scene-number'>
                    Scene {currentScene.scene_number}
                </div>
                <button className='menu-button' onClick={() => navigate("/user")}>
                    MENU
                </button>
                <div className='hangmanContainer'>
                    {hangmanImg && <img src={hangmanImg} alt="Hangman" className='hangman' />}
                    <img src={branch} alt='Branch' className='branch'></img>
                    <div className='wrong-guess'>
                        <div className='wrong-guess-inner-container'>
                            {wrongGuessed?.map((letter, index) => (
                                <p key={index}>{letter}</p>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className='word-container'>
                    <div>
                        <label>Enter Your Guess: </label>
                        <div className='input-container'>
                            <div>{displayWord?.join(' ')}</div>
                        </div>
                    </div>
                </div>
                {status === "won" && (
                    <button className='next-scene' onClick={async () => {
                        console.log("NEXT SCENE : ", currentScene.next_scene)
                        if (currentScene.next_scene === -1) {
                            navigate("/gamewon")
                            return;
                        }
                        await LevelComplete(currentScene.next_scene)
                        console.log("NAVIGATING TO SCENEPAGE")
                        navigate("/scenepage")
                    }} autoFocus>Next Scene</button>
                )}
            </div>
        </LoadingPage>
    );
};

export default Hangman;
