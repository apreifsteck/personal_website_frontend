import axios from 'axios'

const backend = axios.create({
    baseURL: 'http://localhost:4000/'
})

export default backend;