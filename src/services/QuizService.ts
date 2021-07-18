import Axios from "../plugins/http/axios.instance"

class QuizService {
    static async create(data) {
        return (await Axios.post(`/quiz`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/quiz/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/quiz`, { params: { page } })).data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/quiz/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/quiz/${id}`)).data.data
    }

    static async getAllFromDiscipline(discipline_id: string) {
        return (await Axios.post(`/quiz/get/discipline`, { discipline: discipline_id })).data.data
    }
}

export { QuizService }