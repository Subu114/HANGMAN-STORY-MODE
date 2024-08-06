import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../config/serverUrl';
import { useNavigate } from 'react-router-dom';
import { setGameState, setScene, userDataRemove } from '../auth';
import LoadingPage from '../components/LoadingPage';
import { message } from 'antd';
import { _id, token } from '../config/userData';
//nav usingkeys (DONE)
//imag load bfrtext
//home pageimg rearrangr 
//torture effects fr hangman when incorrect input 
const Game = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const fetchScene = async () => {
        try {
            setLoading(true)
            const user_id = _id
            const scene_id = 1;

            const res = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${scene_id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(res.data)
            setScene(res)
            const n = Number(res.data.scene.scene_word)
            const displayWord = Array(n).fill('_')
            console.log(displayWord)
            setGameState(user_id, scene_id, displayWord, [], 3)
            setLoading(false)
            navigate('/scenepage')
        } catch (error) {
            setLoading(false)
            console.log("Error:", error);
            message.error(error.response ? error.response.data.message : error.message)
            navigate('/')
        }
    }

    const fetchSceneState = async () => {
        try {
            setLoading(true)
            const _id = JSON.parse(localStorage.getItem("user"))._id
            const token = localStorage.getItem("token")
            console.log("Current _id:", _id);
            console.log(token);

            const res = await axios({
                method: "GET",
                url: `${serverUrl}/users/game-state/${_id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const scene_id = res.data.gameState.scene_id

            const res2 = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${scene_id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(res2.data)
            setScene(res2)
            setLoading(false)
            navigate("/scenepage")

        } catch (error) {
            setLoading(false)
            console.log("Error:", error);
            if (error.response) {
                console.log("Response error data:", error.response.data.message);

                if (error.response.status === 403) {
                    console.log("Forbidden");
                    message.error("user not authenticated", 5)
                    userDataRemove()
                    navigate("/")
                }
                else if (error.response.status === 404) {
                    fetchScene();
                }
            }
            else {

                console.log("Error:", error.message);
                message.error(error.message, 5)
            }
        }
    };

    useEffect(() => {
        fetchSceneState()
    }, [])
    return (
        <LoadingPage loading={loading}>

        </LoadingPage>
    );
};

export default Game;
