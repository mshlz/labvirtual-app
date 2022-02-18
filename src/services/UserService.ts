import Axios from "../plugins/http/axios.instance"

export class UserService {
    static async getProfile() {
        return (await Axios.get('/users/profile')).data.data
    }

    static async updateProfile(data) {
        return (await Axios.post('/users/update', data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/users/${id}`)).data.data
    }
}
