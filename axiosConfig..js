import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

axios.defaults.baseURL = BASE_URL

export default axios
