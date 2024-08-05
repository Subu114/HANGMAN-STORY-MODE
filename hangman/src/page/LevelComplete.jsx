import React from 'react'
import { setGameState, setScene } from '../auth';
import { _id, token } from '../config/userData';
import axios from 'axios';
import { serverUrl } from '../config/serverUrl';
import { message } from 'antd';

const LevelComplete = async (nextScene) => {
        try {
            console.log("Next scee : ", nextScene)
            const res = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${nextScene}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(res.data)
            setScene(res)
            console.log("SCENE SET SUCCESSFULLY")
            
            const n = Number(res.data.scene.scene_word)
            const displayWord = Array(n).fill('_')
            console.log(displayWord)
            setGameState(_id, nextScene, displayWord, [], -1)
            return
        } catch (error) {
            console.log("Error:", error);
            if (error.response) {
                console.log("Response error data:", error.response.data.message);
                message.error(error.response.data.message, 3)
            }
            else {
                console.log("Error:", error.message);
                message.error(error.message, 3)
            }
        }
    };


export default LevelComplete