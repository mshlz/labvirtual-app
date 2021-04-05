import Axios from "../plugins/http/axios.instance"

class LessonService {
    static async create(data) {
        return (await Axios.post(`/lessons`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/lessons/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/lessons`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/lessons/${id}`, data)).data.data
    }

    static async getAllFromDiscipline(discipline_id: string) {
        return (await Axios.post(`/lessons/get/discipline`, { discipline: discipline_id })).data.data
    }
}

export { LessonService }