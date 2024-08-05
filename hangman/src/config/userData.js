const token = localStorage.getItem("token")
const _id = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))._id : ""
const userData = JSON.parse(localStorage.getItem("user"))

export {token, _id, userData}