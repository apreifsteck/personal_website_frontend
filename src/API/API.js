import axios from '../axios'

class API {
    constructor() {
        this.pid = process.env.REACT_APP_PRIMARY_ID        
    }
    //Auth stuff
    static createSession(uname, password) {
        return axios.post("/auth/session", {
            user: {
                uname: uname,
                password: password
            }
        })
    }
    static refreshSession(refreshToken) {
        return axios.post("/auth/session/renew")
    }
    static deleteSession() {
        return axios.delete("/auth/session")
    }
    // Image stuff
    getPrimaryImages() {
        return axios.get("/images", {params: {user_id: this.pid}})
    }
    static getImagePathFromFilename(filename) {
        return `${process.env.REACT_APP_BACKEND_URL}/media/user/${filename[0]}/${filename}`
    }

    static uploadImage(title, desc, file) {
        const data = new FormData()
        data.append("title", title)
        data.append("description", desc)
        data.append("image", file)
        return axios.post("/images", data, {headers: {'content-type': 'multipart/form-data'}})
    }
    // Post stuff
    getPrimaryPosts() {
        return axios.get(`/posts/${this.pid}`)
    }
}

export default API