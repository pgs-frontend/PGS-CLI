import axios from "axios";

const cliAPI = axios.create({
    baseURL: 'https://api.pgsio.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default cliAPI;