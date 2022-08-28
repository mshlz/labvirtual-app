import Axios from "../plugins/http/axios.instance"

class InstitutionService {
  static async create(data) {
    return (await Axios.post(`/institutions`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/institutions/${id}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/institutions`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/institutions/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/institutions/${id}`)).data.data
  }
}

export { InstitutionService }
