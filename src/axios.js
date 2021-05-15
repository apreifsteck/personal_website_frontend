import axios from 'axios'

const backend = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10 * 1000
})

export default backend;