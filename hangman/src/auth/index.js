import axios from "axios"
import { serverUrl } from "../config/serverUrl"
import { token } from "../config/userData"
import { message } from "antd"

const userAuthenticated = (response) => {
    localStorage.setItem("user", JSON.stringify(response.data.user))
    localStorage.setItem("token", response.data.token)
    return true
}


const getToken = () => {
    return localStorage.getItem("token")
}

const getUserId = () => {
    const val = JSON.parse(localStorage.getItem("user"));
    return val ? val._id : null;

}

const setUserData = (val) => {
    localStorage.setItem("user", JSON.stringify(val))
}

const userDataRemove = () => {
    localStorage.clear()
}

const isAuth = () => {
    try {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if (!token || !user) {
            return false
        }
        return true

    } catch (error) {
        return false
    }
}

const isAdmin = () => {
    try {
        const role = JSON.parse(localStorage.getItem("user")).role
        if (role === "admin") {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setScene = (response) => {
    localStorage.setItem("current-scene", JSON.stringify(response.data.scene))
}
const setLevel = (level) => {
    localStorage.setItem("level", JSON.stringify(level))
}
const getLevel = () => {
    return Number(localStorage.getItem("level"))
}
const getScene = () => {
    return (localStorage.getItem("current-scene"))
}

const setGameState = async (user_id, scene_id, display_word, wrong_guessed, hint) => {
    try {
        const level = getLevel()
        console.log(level)
        display_word = display_word.join(' ')
        wrong_guessed = wrong_guessed.join(' ') ? wrong_guessed.join(' ') : ""
        const res = await axios({
            method: "POST",
            url: `${serverUrl}/users/game-state/create`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data : { scene_id, display_word, wrong_guessed, hint, level}
        });

    } catch (error) {
        message.error("Error changing scene/level")
    }
}

const restartGame = async() => {
    try {
        const res = await axios({
            method : "DELETE",
            url : `${serverUrl}/users/game-state/delete`,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        message.success(res.data.message)
        return true
    } catch (error) {
        message.error("Error while restarting game")
        return false
    }
}

export { 
    userAuthenticated, 
    userDataRemove, 
    isAuth, 
    isAdmin, 
    setScene, 
    setGameState, 
    setUserData, 
    restartGame,
    setLevel,
    getLevel,
    getToken,
    getUserId
}
