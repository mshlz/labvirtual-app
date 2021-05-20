import Axios from "../plugins/http/axios.instance"

class GlossaryService {
    static async create(data) {
        return (await Axios.post(`/glossary`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/glossary/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/glossary`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/glossary/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/glossary/${id}`)).data.data
    }

    static async getAllFromDiscipline(discipline_id: string) {
        return (await Axios.post(`/glossary/get/discipline`, { discipline: discipline_id })).data.data
    }
}

export { GlossaryService }