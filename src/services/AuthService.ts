import Axios from "../plugins/http/axios.instance"

class AuthService {
    static async login(data) {
        const response = await Axios.post('/auth/login', data)
        return response.data
    }

    static async register(data) {
        const response = await Axios.post('/auth/register', data)
        return response.data
    }

    static async forgotPassword(data) {
        const response = await Axios.post('/auth/forgot-password', data)
        return response.data
    }

    static async resetPassword(data) {
        const response = await Axios.post('/auth/reset-password', data)
        return response.data
    }
}

export { AuthService }