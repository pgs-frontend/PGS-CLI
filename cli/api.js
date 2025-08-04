import axios, { Axios } from "axios";

const cliAPI = axios.create({
    baseURL: 'https://api.pgscli.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
    }
})

export default cliAPI;