import axios from "axios"
import { serverUrl } from "../config/serverUrl"
import { token } from "../config/userData"

const userAuthenticated = (response) => {
    localStorage.setItem("user", JSON.stringify(response.data.user))
    localStorage.setItem("token", response.data.token)
    return true
}

const setUserData = (val) => {
    localStorage.setItem("user", JSON.stringify(val))
}

const userDataRemove = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('current-scene')
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
const getScene = () => {
    return (localStorage.getItem("current-scene"))
}

const setGameState = async (user_id, scene_id, display_word, wrong_guessed, hint) => {
    display_word = display_word.join(' ')
    wrong_guessed = wrong_guessed.join(' ') ? wrong_guessed.join(' ') : ""
    console.log(wrong_guessed)
    const res = await axios({
        method: "POST",
        url: `${serverUrl}/users/game-state/create`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data : {user_id, scene_id, display_word, wrong_guessed, hint}
    });

    console.log("GAME STATE SET SUCCESSFULLY")
}

export { userAuthenticated, userDataRemove, isAuth, isAdmin, setScene, setGameState, setUserData}