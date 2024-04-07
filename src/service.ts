import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.GAME_LOG_URL
})

export default axiosInstance
