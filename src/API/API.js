import axios from '../axios'

const formHeaders = {headers: {'content-type': 'multipart/form-data'}};
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
    getPrimaryImages(searchParams) {
        return axios.get("/images", {params: {user_id: this.pid, ...searchParams}})
    }
    
    static prefixImgPath(path) {
        return `${process.env.REACT_APP_BACKEND_URL}${path}`
    }

    static uploadImage(title, desc, file, is_gallery_image = false) {
        const data = new FormData()
        data.append("title", title)
        data.append("description", desc)
        data.append("image", file)
        data.append("is_gallery_img", is_gallery_image)
        return axios.post("/images", data, formHeaders)
    }

    static uploadBlogImage(hash, file) {
        const renamedFile = new File([file], `${hash}.png`)
        console.log(renamedFile)
        return this.uploadImage(hash, "", renamedFile)
    }

    static deleteImage(id) {
        return axios.delete(`/images/${id}`)
    }
    // Post stuff
    getPrimaryPosts() {
        return axios.get(`/posts/${this.pid}`)
    }

    static submitPost(title, body, images) {
        const data = {post: {title: title, body: body, img_ids: images}}
        return axios.post("/posts", data)
    }
}

export default API