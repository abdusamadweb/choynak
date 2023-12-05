import axios from 'axios'

export const API = 'https://api.choynak.org/api/e5211d4e897f44198925b679e91bf0f0'

const $api = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json"
    }
})

export default $api
