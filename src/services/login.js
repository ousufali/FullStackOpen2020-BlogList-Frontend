import Axios from 'axios'
import axois from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
    console.log("credentials:  ",credentials)
    const response = await axois.post(baseUrl,credentials)
    console.log("response.data:  ",response.data)

    return response.data
}



export default {
    login
}