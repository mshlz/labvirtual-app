import Axios from "../plugins/http/axios.instance"

export class SubjectService {
    static async create(data) {
        return (await Axios.post(`/subjects`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/subjects/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/subjects`, { params: { page } })).data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/subjects/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/subjects/${id}`)).data.data
    }

    static async getFromDisciplines(discipline_ids: string | string[]) {
        return (await Axios.post(`/subjects/from/disciplines`, { disciplines: Array.isArray(discipline_ids) ? discipline_ids : [discipline_ids] })).data.data
    }
}
