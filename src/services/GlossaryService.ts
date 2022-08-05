import Axios from "../plugins/http/axios.instance"

export class GlossaryService {
  static async create(data) {
    return (await Axios.post(`/glossary`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/glossary/${id}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/glossary`, { params: { page } })).data
  }

  static async simpleSearch(params: {
    query?: string
    page?: number
    limit?: number
  }) {
    return (await Axios.get(`/glossary/search`, { params })).data.data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/glossary/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/glossary/${id}`)).data.data
  }

  static async getFromDiscipline(disciplines: string | string[]) {
    return (
      await Axios.post(`/glossary/from/disciplines`, {
        discipline: Array.isArray(disciplines) ? disciplines : [disciplines],
      })
    ).data.data
  }
}
