import Axios from "../plugins/http/axios.instance"

class UserService {
    static async getProfile() {
        return (await Axios.get('/users/me')).data.data
    }

    static async updateProfile(data) {
        return (await Axios.post('/users/update', data)).data.data
    }
}

export { UserService }