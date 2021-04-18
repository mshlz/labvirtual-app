import Axios from "../plugins/http/axios.instance"

class ClassService {
    static async create(data) {
        return (await Axios.post(`/classes`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/classes/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/classes`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/classes/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/classes/${id}`)).data.data
    }
}

export { ClassService }