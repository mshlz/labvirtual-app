import Axios from "../plugins/http/axios.instance"

export class PageSectionService {
  static async create(data) {
    return (await Axios.post(`/page-sections`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/page-sections/${id}`)).data.data
  }

  static async getBySlug(slug: string) {
    return (await Axios.get(`/page-sections/slug/${slug}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/page-sections`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/page-sections/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/page-sections/${id}`)).data.data
  }
}
