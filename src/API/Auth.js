import axios from '../axios'

export const createSession = (uname, password) => {
    return axios.post("/auth/session", {
        user: {
            uname: uname,
            password: password
        }
    })
}

export const deleteSession = () => {
    return axios.delete("/auth/session")
}

// export const refresh = () => {
    // return axios.post("/auth/refresh")
// }