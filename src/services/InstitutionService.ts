import Axios from "../plugins/http/axios.instance"

class InstitutionService {
    static async create(data) {
        return (await Axios.post(`/institutions`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/institutions/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/institutions`)).data.data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/institutions/${id}`, data)).data.data
    }
}

export { InstitutionService }