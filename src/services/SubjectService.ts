import Axios from "../plugins/http/axios.instance"

class SubjectService {
    static async create(data) {
        return (await Axios.post(`/subjects`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/subjects/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/subjects`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/subjects/${id}`, data)).data.data
    }
}

export { SubjectService }