import axios from "axios";

const cliAPI = axios.create({
    baseURL: 'http://localhost:8380/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default cliAPI;