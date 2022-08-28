import Axios from "../plugins/http/axios.instance"

export class HelpSectionService {
  static async create(data) {
    return (await Axios.post(`/help-sections`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/help-sections/${id}`)).data.data
  }

  static async getBySlug(slug: string) {
    return (await Axios.get(`/help-sections/slug/${slug}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/help-sections`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/help-sections/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/help-sections/${id}`)).data.data
  }
}
