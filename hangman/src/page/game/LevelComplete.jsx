import React from 'react'
import { getLevel, setGameState, setScene } from '../../auth';
import { _id, token } from '../../config/userData';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { message } from 'antd';

const LevelComplete = async (nextScene) => {
        try {
            const level = getLevel()
            const res = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${nextScene}/${level}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setScene(res)
            
            const n = Number(res.data.scene.scene_word)
            const displayWord = Array(n).fill('_')
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