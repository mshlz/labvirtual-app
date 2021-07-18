import Axios from "../plugins/http/axios.instance"

class QuestionService {
    static async create(data) {
        return (await Axios.post(`/questions`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/questions/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/questions`, { params: { page } })).data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/questions/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/questions/${id}`)).data.data
    }

    static async getAllFromDiscipline(discipline_id: string) {
        return (await Axios.post(`/questions/get/discipline`, { discipline: discipline_id })).data.data
    }
}

export { QuestionService }