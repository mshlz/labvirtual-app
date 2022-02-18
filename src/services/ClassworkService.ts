import Axios from "../plugins/http/axios.instance"

export class ClassworkService {
    static async create(data) {
        return (await Axios.post(`/classworks`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/classworks/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/classworks`, { params: { page } })).data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/classworks/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/classworks/${id}`)).data.data
    }

    static async getFromClass(classId: string) {
        return (await Axios.post(`/classworks/from/class`, { classId })).data.data
    }

}
