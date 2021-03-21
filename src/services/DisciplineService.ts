import Axios from "../plugins/http/axios.instance"

class DisciplineService {
    static async create(data) {
        return (await Axios.post(`/disciplines`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/disciplines/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/disciplines`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/disciplines/${id}`, data)).data.data
    }
}

export { DisciplineService }